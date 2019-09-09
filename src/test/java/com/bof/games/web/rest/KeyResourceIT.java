package com.bof.games.web.rest;

import com.bof.games.BofgamesApp;
import com.bof.games.domain.Key;
import com.bof.games.repository.KeyRepository;
import com.bof.games.repository.search.KeySearchRepository;
import com.bof.games.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.Collections;
import java.util.List;

import static com.bof.games.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.bof.games.domain.enumeration.KEYSTATUS;
/**
 * Integration tests for the {@link KeyResource} REST controller.
 */
@SpringBootTest(classes = BofgamesApp.class)
public class KeyResourceIT {

    private static final String DEFAULT_VALUE = "AAAAAAAAAA";
    private static final String UPDATED_VALUE = "BBBBBBBBBB";

    private static final KEYSTATUS DEFAULT_STATUS = KEYSTATUS.AVAILABLE;
    private static final KEYSTATUS UPDATED_STATUS = KEYSTATUS.RESERVED;

    @Autowired
    private KeyRepository keyRepository;

    /**
     * This repository is mocked in the com.bof.games.repository.search test package.
     *
     * @see com.bof.games.repository.search.KeySearchRepositoryMockConfiguration
     */
    @Autowired
    private KeySearchRepository mockKeySearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restKeyMockMvc;

    private Key key;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final KeyResource keyResource = new KeyResource(keyRepository, mockKeySearchRepository);
        this.restKeyMockMvc = MockMvcBuilders.standaloneSetup(keyResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Key createEntity(EntityManager em) {
        Key key = new Key()
            .value(DEFAULT_VALUE)
            .status(DEFAULT_STATUS);
        return key;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Key createUpdatedEntity(EntityManager em) {
        Key key = new Key()
            .value(UPDATED_VALUE)
            .status(UPDATED_STATUS);
        return key;
    }

    @BeforeEach
    public void initTest() {
        key = createEntity(em);
    }

    @Test
    @Transactional
    public void createKey() throws Exception {
        int databaseSizeBeforeCreate = keyRepository.findAll().size();

        // Create the Key
        restKeyMockMvc.perform(post("/api/keys")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(key)))
            .andExpect(status().isCreated());

        // Validate the Key in the database
        List<Key> keyList = keyRepository.findAll();
        assertThat(keyList).hasSize(databaseSizeBeforeCreate + 1);
        Key testKey = keyList.get(keyList.size() - 1);
        assertThat(testKey.getValue()).isEqualTo(DEFAULT_VALUE);
        assertThat(testKey.getStatus()).isEqualTo(DEFAULT_STATUS);

        // Validate the Key in Elasticsearch
        verify(mockKeySearchRepository, times(1)).save(testKey);
    }

    @Test
    @Transactional
    public void createKeyWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = keyRepository.findAll().size();

        // Create the Key with an existing ID
        key.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restKeyMockMvc.perform(post("/api/keys")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(key)))
            .andExpect(status().isBadRequest());

        // Validate the Key in the database
        List<Key> keyList = keyRepository.findAll();
        assertThat(keyList).hasSize(databaseSizeBeforeCreate);

        // Validate the Key in Elasticsearch
        verify(mockKeySearchRepository, times(0)).save(key);
    }


    @Test
    @Transactional
    public void getAllKeys() throws Exception {
        // Initialize the database
        keyRepository.saveAndFlush(key);

        // Get all the keyList
        restKeyMockMvc.perform(get("/api/keys?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(key.getId().intValue())))
            .andExpect(jsonPath("$.[*].value").value(hasItem(DEFAULT_VALUE.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())));
    }
    
    @Test
    @Transactional
    public void getKey() throws Exception {
        // Initialize the database
        keyRepository.saveAndFlush(key);

        // Get the key
        restKeyMockMvc.perform(get("/api/keys/{id}", key.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(key.getId().intValue()))
            .andExpect(jsonPath("$.value").value(DEFAULT_VALUE.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingKey() throws Exception {
        // Get the key
        restKeyMockMvc.perform(get("/api/keys/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateKey() throws Exception {
        // Initialize the database
        keyRepository.saveAndFlush(key);

        int databaseSizeBeforeUpdate = keyRepository.findAll().size();

        // Update the key
        Key updatedKey = keyRepository.findById(key.getId()).get();
        // Disconnect from session so that the updates on updatedKey are not directly saved in db
        em.detach(updatedKey);
        updatedKey
            .value(UPDATED_VALUE)
            .status(UPDATED_STATUS);

        restKeyMockMvc.perform(put("/api/keys")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedKey)))
            .andExpect(status().isOk());

        // Validate the Key in the database
        List<Key> keyList = keyRepository.findAll();
        assertThat(keyList).hasSize(databaseSizeBeforeUpdate);
        Key testKey = keyList.get(keyList.size() - 1);
        assertThat(testKey.getValue()).isEqualTo(UPDATED_VALUE);
        assertThat(testKey.getStatus()).isEqualTo(UPDATED_STATUS);

        // Validate the Key in Elasticsearch
        verify(mockKeySearchRepository, times(1)).save(testKey);
    }

    @Test
    @Transactional
    public void updateNonExistingKey() throws Exception {
        int databaseSizeBeforeUpdate = keyRepository.findAll().size();

        // Create the Key

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restKeyMockMvc.perform(put("/api/keys")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(key)))
            .andExpect(status().isBadRequest());

        // Validate the Key in the database
        List<Key> keyList = keyRepository.findAll();
        assertThat(keyList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Key in Elasticsearch
        verify(mockKeySearchRepository, times(0)).save(key);
    }

    @Test
    @Transactional
    public void deleteKey() throws Exception {
        // Initialize the database
        keyRepository.saveAndFlush(key);

        int databaseSizeBeforeDelete = keyRepository.findAll().size();

        // Delete the key
        restKeyMockMvc.perform(delete("/api/keys/{id}", key.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Key> keyList = keyRepository.findAll();
        assertThat(keyList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Key in Elasticsearch
        verify(mockKeySearchRepository, times(1)).deleteById(key.getId());
    }

    @Test
    @Transactional
    public void searchKey() throws Exception {
        // Initialize the database
        keyRepository.saveAndFlush(key);
        when(mockKeySearchRepository.search(queryStringQuery("id:" + key.getId())))
            .thenReturn(Collections.singletonList(key));
        // Search the key
        restKeyMockMvc.perform(get("/api/_search/keys?query=id:" + key.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(key.getId().intValue())))
            .andExpect(jsonPath("$.[*].value").value(hasItem(DEFAULT_VALUE)))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Key.class);
        Key key1 = new Key();
        key1.setId(1L);
        Key key2 = new Key();
        key2.setId(key1.getId());
        assertThat(key1).isEqualTo(key2);
        key2.setId(2L);
        assertThat(key1).isNotEqualTo(key2);
        key1.setId(null);
        assertThat(key1).isNotEqualTo(key2);
    }
}
