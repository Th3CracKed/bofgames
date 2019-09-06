package fr.bofgames.web.rest;

import fr.bofgames.BofGamesApp;
import fr.bofgames.domain.Platform;
import fr.bofgames.repository.PlatformRepository;
import fr.bofgames.repository.search.PlatformSearchRepository;
import fr.bofgames.web.rest.errors.ExceptionTranslator;

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

import static fr.bofgames.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link PlatformResource} REST controller.
 */
@SpringBootTest(classes = BofGamesApp.class)
public class PlatformResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private PlatformRepository platformRepository;

    /**
     * This repository is mocked in the fr.bofgames.repository.search test package.
     *
     * @see fr.bofgames.repository.search.PlatformSearchRepositoryMockConfiguration
     */
    @Autowired
    private PlatformSearchRepository mockPlatformSearchRepository;

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

    private MockMvc restPlatformMockMvc;

    private Platform platform;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PlatformResource platformResource = new PlatformResource(platformRepository, mockPlatformSearchRepository);
        this.restPlatformMockMvc = MockMvcBuilders.standaloneSetup(platformResource)
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
    public static Platform createEntity(EntityManager em) {
        Platform platform = new Platform()
            .name(DEFAULT_NAME);
        return platform;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Platform createUpdatedEntity(EntityManager em) {
        Platform platform = new Platform()
            .name(UPDATED_NAME);
        return platform;
    }

    @BeforeEach
    public void initTest() {
        platform = createEntity(em);
    }

    @Test
    @Transactional
    public void createPlatform() throws Exception {
        int databaseSizeBeforeCreate = platformRepository.findAll().size();

        // Create the Platform
        restPlatformMockMvc.perform(post("/api/platforms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(platform)))
            .andExpect(status().isCreated());

        // Validate the Platform in the database
        List<Platform> platformList = platformRepository.findAll();
        assertThat(platformList).hasSize(databaseSizeBeforeCreate + 1);
        Platform testPlatform = platformList.get(platformList.size() - 1);
        assertThat(testPlatform.getName()).isEqualTo(DEFAULT_NAME);

        // Validate the Platform in Elasticsearch
        verify(mockPlatformSearchRepository, times(1)).save(testPlatform);
    }

    @Test
    @Transactional
    public void createPlatformWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = platformRepository.findAll().size();

        // Create the Platform with an existing ID
        platform.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPlatformMockMvc.perform(post("/api/platforms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(platform)))
            .andExpect(status().isBadRequest());

        // Validate the Platform in the database
        List<Platform> platformList = platformRepository.findAll();
        assertThat(platformList).hasSize(databaseSizeBeforeCreate);

        // Validate the Platform in Elasticsearch
        verify(mockPlatformSearchRepository, times(0)).save(platform);
    }


    @Test
    @Transactional
    public void getAllPlatforms() throws Exception {
        // Initialize the database
        platformRepository.saveAndFlush(platform);

        // Get all the platformList
        restPlatformMockMvc.perform(get("/api/platforms?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(platform.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }
    
    @Test
    @Transactional
    public void getPlatform() throws Exception {
        // Initialize the database
        platformRepository.saveAndFlush(platform);

        // Get the platform
        restPlatformMockMvc.perform(get("/api/platforms/{id}", platform.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(platform.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPlatform() throws Exception {
        // Get the platform
        restPlatformMockMvc.perform(get("/api/platforms/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePlatform() throws Exception {
        // Initialize the database
        platformRepository.saveAndFlush(platform);

        int databaseSizeBeforeUpdate = platformRepository.findAll().size();

        // Update the platform
        Platform updatedPlatform = platformRepository.findById(platform.getId()).get();
        // Disconnect from session so that the updates on updatedPlatform are not directly saved in db
        em.detach(updatedPlatform);
        updatedPlatform
            .name(UPDATED_NAME);

        restPlatformMockMvc.perform(put("/api/platforms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPlatform)))
            .andExpect(status().isOk());

        // Validate the Platform in the database
        List<Platform> platformList = platformRepository.findAll();
        assertThat(platformList).hasSize(databaseSizeBeforeUpdate);
        Platform testPlatform = platformList.get(platformList.size() - 1);
        assertThat(testPlatform.getName()).isEqualTo(UPDATED_NAME);

        // Validate the Platform in Elasticsearch
        verify(mockPlatformSearchRepository, times(1)).save(testPlatform);
    }

    @Test
    @Transactional
    public void updateNonExistingPlatform() throws Exception {
        int databaseSizeBeforeUpdate = platformRepository.findAll().size();

        // Create the Platform

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPlatformMockMvc.perform(put("/api/platforms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(platform)))
            .andExpect(status().isBadRequest());

        // Validate the Platform in the database
        List<Platform> platformList = platformRepository.findAll();
        assertThat(platformList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Platform in Elasticsearch
        verify(mockPlatformSearchRepository, times(0)).save(platform);
    }

    @Test
    @Transactional
    public void deletePlatform() throws Exception {
        // Initialize the database
        platformRepository.saveAndFlush(platform);

        int databaseSizeBeforeDelete = platformRepository.findAll().size();

        // Delete the platform
        restPlatformMockMvc.perform(delete("/api/platforms/{id}", platform.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Platform> platformList = platformRepository.findAll();
        assertThat(platformList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Platform in Elasticsearch
        verify(mockPlatformSearchRepository, times(1)).deleteById(platform.getId());
    }

    @Test
    @Transactional
    public void searchPlatform() throws Exception {
        // Initialize the database
        platformRepository.saveAndFlush(platform);
        when(mockPlatformSearchRepository.search(queryStringQuery("id:" + platform.getId())))
            .thenReturn(Collections.singletonList(platform));
        // Search the platform
        restPlatformMockMvc.perform(get("/api/_search/platforms?query=id:" + platform.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(platform.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Platform.class);
        Platform platform1 = new Platform();
        platform1.setId(1L);
        Platform platform2 = new Platform();
        platform2.setId(platform1.getId());
        assertThat(platform1).isEqualTo(platform2);
        platform2.setId(2L);
        assertThat(platform1).isNotEqualTo(platform2);
        platform1.setId(null);
        assertThat(platform1).isNotEqualTo(platform2);
    }
}
