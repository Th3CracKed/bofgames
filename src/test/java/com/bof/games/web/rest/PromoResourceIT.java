package com.bof.games.web.rest;

import com.bof.games.BofgamesApp;
import com.bof.games.domain.Promo;
import com.bof.games.repository.PromoRepository;
import com.bof.games.repository.search.PromoSearchRepository;
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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Collections;
import java.util.List;

import static com.bof.games.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link PromoResource} REST controller.
 */
@SpringBootTest(classes = BofgamesApp.class)
public class PromoResourceIT {

    private static final Double DEFAULT_SALE = 1D;
    private static final Double UPDATED_SALE = 2D;
    private static final Double SMALLER_SALE = 1D - 1D;

    private static final LocalDate DEFAULT_START = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_START = LocalDate.now(ZoneId.systemDefault());
    private static final LocalDate SMALLER_START = LocalDate.ofEpochDay(-1L);

    private static final LocalDate DEFAULT_END = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_END = LocalDate.now(ZoneId.systemDefault());
    private static final LocalDate SMALLER_END = LocalDate.ofEpochDay(-1L);

    @Autowired
    private PromoRepository promoRepository;

    /**
     * This repository is mocked in the com.bof.games.repository.search test package.
     *
     * @see com.bof.games.repository.search.PromoSearchRepositoryMockConfiguration
     */
    @Autowired
    private PromoSearchRepository mockPromoSearchRepository;

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

    private MockMvc restPromoMockMvc;

    private Promo promo;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PromoResource promoResource = new PromoResource(promoRepository, mockPromoSearchRepository);
        this.restPromoMockMvc = MockMvcBuilders.standaloneSetup(promoResource)
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
    public static Promo createEntity(EntityManager em) {
        Promo promo = new Promo()
            .sale(DEFAULT_SALE)
            .start(DEFAULT_START)
            .end(DEFAULT_END);
        return promo;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Promo createUpdatedEntity(EntityManager em) {
        Promo promo = new Promo()
            .sale(UPDATED_SALE)
            .start(UPDATED_START)
            .end(UPDATED_END);
        return promo;
    }

    @BeforeEach
    public void initTest() {
        promo = createEntity(em);
    }

    @Test
    @Transactional
    public void createPromo() throws Exception {
        int databaseSizeBeforeCreate = promoRepository.findAll().size();

        // Create the Promo
        restPromoMockMvc.perform(post("/api/promos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(promo)))
            .andExpect(status().isCreated());

        // Validate the Promo in the database
        List<Promo> promoList = promoRepository.findAll();
        assertThat(promoList).hasSize(databaseSizeBeforeCreate + 1);
        Promo testPromo = promoList.get(promoList.size() - 1);
        assertThat(testPromo.getSale()).isEqualTo(DEFAULT_SALE);
        assertThat(testPromo.getStart()).isEqualTo(DEFAULT_START);
        assertThat(testPromo.getEnd()).isEqualTo(DEFAULT_END);

        // Validate the Promo in Elasticsearch
        verify(mockPromoSearchRepository, times(1)).save(testPromo);
    }

    @Test
    @Transactional
    public void createPromoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = promoRepository.findAll().size();

        // Create the Promo with an existing ID
        promo.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPromoMockMvc.perform(post("/api/promos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(promo)))
            .andExpect(status().isBadRequest());

        // Validate the Promo in the database
        List<Promo> promoList = promoRepository.findAll();
        assertThat(promoList).hasSize(databaseSizeBeforeCreate);

        // Validate the Promo in Elasticsearch
        verify(mockPromoSearchRepository, times(0)).save(promo);
    }


    @Test
    @Transactional
    public void getAllPromos() throws Exception {
        // Initialize the database
        promoRepository.saveAndFlush(promo);

        // Get all the promoList
        restPromoMockMvc.perform(get("/api/promos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(promo.getId().intValue())))
            .andExpect(jsonPath("$.[*].sale").value(hasItem(DEFAULT_SALE.doubleValue())))
            .andExpect(jsonPath("$.[*].start").value(hasItem(DEFAULT_START.toString())))
            .andExpect(jsonPath("$.[*].end").value(hasItem(DEFAULT_END.toString())));
    }
    
    @Test
    @Transactional
    public void getPromo() throws Exception {
        // Initialize the database
        promoRepository.saveAndFlush(promo);

        // Get the promo
        restPromoMockMvc.perform(get("/api/promos/{id}", promo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(promo.getId().intValue()))
            .andExpect(jsonPath("$.sale").value(DEFAULT_SALE.doubleValue()))
            .andExpect(jsonPath("$.start").value(DEFAULT_START.toString()))
            .andExpect(jsonPath("$.end").value(DEFAULT_END.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPromo() throws Exception {
        // Get the promo
        restPromoMockMvc.perform(get("/api/promos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePromo() throws Exception {
        // Initialize the database
        promoRepository.saveAndFlush(promo);

        int databaseSizeBeforeUpdate = promoRepository.findAll().size();

        // Update the promo
        Promo updatedPromo = promoRepository.findById(promo.getId()).get();
        // Disconnect from session so that the updates on updatedPromo are not directly saved in db
        em.detach(updatedPromo);
        updatedPromo
            .sale(UPDATED_SALE)
            .start(UPDATED_START)
            .end(UPDATED_END);

        restPromoMockMvc.perform(put("/api/promos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPromo)))
            .andExpect(status().isOk());

        // Validate the Promo in the database
        List<Promo> promoList = promoRepository.findAll();
        assertThat(promoList).hasSize(databaseSizeBeforeUpdate);
        Promo testPromo = promoList.get(promoList.size() - 1);
        assertThat(testPromo.getSale()).isEqualTo(UPDATED_SALE);
        assertThat(testPromo.getStart()).isEqualTo(UPDATED_START);
        assertThat(testPromo.getEnd()).isEqualTo(UPDATED_END);

        // Validate the Promo in Elasticsearch
        verify(mockPromoSearchRepository, times(1)).save(testPromo);
    }

    @Test
    @Transactional
    public void updateNonExistingPromo() throws Exception {
        int databaseSizeBeforeUpdate = promoRepository.findAll().size();

        // Create the Promo

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPromoMockMvc.perform(put("/api/promos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(promo)))
            .andExpect(status().isBadRequest());

        // Validate the Promo in the database
        List<Promo> promoList = promoRepository.findAll();
        assertThat(promoList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Promo in Elasticsearch
        verify(mockPromoSearchRepository, times(0)).save(promo);
    }

    @Test
    @Transactional
    public void deletePromo() throws Exception {
        // Initialize the database
        promoRepository.saveAndFlush(promo);

        int databaseSizeBeforeDelete = promoRepository.findAll().size();

        // Delete the promo
        restPromoMockMvc.perform(delete("/api/promos/{id}", promo.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Promo> promoList = promoRepository.findAll();
        assertThat(promoList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Promo in Elasticsearch
        verify(mockPromoSearchRepository, times(1)).deleteById(promo.getId());
    }

    @Test
    @Transactional
    public void searchPromo() throws Exception {
        // Initialize the database
        promoRepository.saveAndFlush(promo);
        when(mockPromoSearchRepository.search(queryStringQuery("id:" + promo.getId())))
            .thenReturn(Collections.singletonList(promo));
        // Search the promo
        restPromoMockMvc.perform(get("/api/_search/promos?query=id:" + promo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(promo.getId().intValue())))
            .andExpect(jsonPath("$.[*].sale").value(hasItem(DEFAULT_SALE.doubleValue())))
            .andExpect(jsonPath("$.[*].start").value(hasItem(DEFAULT_START.toString())))
            .andExpect(jsonPath("$.[*].end").value(hasItem(DEFAULT_END.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Promo.class);
        Promo promo1 = new Promo();
        promo1.setId(1L);
        Promo promo2 = new Promo();
        promo2.setId(promo1.getId());
        assertThat(promo1).isEqualTo(promo2);
        promo2.setId(2L);
        assertThat(promo1).isNotEqualTo(promo2);
        promo1.setId(null);
        assertThat(promo1).isNotEqualTo(promo2);
    }
}
