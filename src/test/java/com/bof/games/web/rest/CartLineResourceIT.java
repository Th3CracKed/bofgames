package com.bof.games.web.rest;

import com.bof.games.BofgamesApp;
import com.bof.games.domain.CartLine;
import com.bof.games.repository.CartLineRepository;
import com.bof.games.repository.search.CartLineSearchRepository;
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

/**
 * Integration tests for the {@link CartLineResource} REST controller.
 */
@SpringBootTest(classes = BofgamesApp.class)
public class CartLineResourceIT {

    private static final Integer DEFAULT_QUANTITY = 1;
    private static final Integer UPDATED_QUANTITY = 2;
    private static final Integer SMALLER_QUANTITY = 1 - 1;

    private static final Double DEFAULT_UNIT_PRICE = 1D;
    private static final Double UPDATED_UNIT_PRICE = 2D;
    private static final Double SMALLER_UNIT_PRICE = 1D - 1D;

    private static final Boolean DEFAULT_EXPIRED = false;
    private static final Boolean UPDATED_EXPIRED = true;

    @Autowired
    private CartLineRepository cartLineRepository;

    /**
     * This repository is mocked in the com.bof.games.repository.search test package.
     *
     * @see com.bof.games.repository.search.CartLineSearchRepositoryMockConfiguration
     */
    @Autowired
    private CartLineSearchRepository mockCartLineSearchRepository;

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

    private MockMvc restCartLineMockMvc;

    private CartLine cartLine;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CartLineResource cartLineResource = new CartLineResource(cartLineRepository, mockCartLineSearchRepository);
        this.restCartLineMockMvc = MockMvcBuilders.standaloneSetup(cartLineResource)
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
    public static CartLine createEntity(EntityManager em) {
        CartLine cartLine = new CartLine()
            .quantity(DEFAULT_QUANTITY)
            .unitPrice(DEFAULT_UNIT_PRICE)
            .expired(DEFAULT_EXPIRED);
        return cartLine;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CartLine createUpdatedEntity(EntityManager em) {
        CartLine cartLine = new CartLine()
            .quantity(UPDATED_QUANTITY)
            .unitPrice(UPDATED_UNIT_PRICE)
            .expired(UPDATED_EXPIRED);
        return cartLine;
    }

    @BeforeEach
    public void initTest() {
        cartLine = createEntity(em);
    }

    @Test
    @Transactional
    public void createCartLine() throws Exception {
        int databaseSizeBeforeCreate = cartLineRepository.findAll().size();

        // Create the CartLine
        restCartLineMockMvc.perform(post("/api/cart-lines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cartLine)))
            .andExpect(status().isCreated());

        // Validate the CartLine in the database
        List<CartLine> cartLineList = cartLineRepository.findAll();
        assertThat(cartLineList).hasSize(databaseSizeBeforeCreate + 1);
        CartLine testCartLine = cartLineList.get(cartLineList.size() - 1);
        assertThat(testCartLine.getQuantity()).isEqualTo(DEFAULT_QUANTITY);
        assertThat(testCartLine.getUnitPrice()).isEqualTo(DEFAULT_UNIT_PRICE);
        assertThat(testCartLine.isExpired()).isEqualTo(DEFAULT_EXPIRED);

        // Validate the CartLine in Elasticsearch
        verify(mockCartLineSearchRepository, times(1)).save(testCartLine);
    }

    @Test
    @Transactional
    public void createCartLineWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = cartLineRepository.findAll().size();

        // Create the CartLine with an existing ID
        cartLine.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCartLineMockMvc.perform(post("/api/cart-lines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cartLine)))
            .andExpect(status().isBadRequest());

        // Validate the CartLine in the database
        List<CartLine> cartLineList = cartLineRepository.findAll();
        assertThat(cartLineList).hasSize(databaseSizeBeforeCreate);

        // Validate the CartLine in Elasticsearch
        verify(mockCartLineSearchRepository, times(0)).save(cartLine);
    }


    @Test
    @Transactional
    public void getAllCartLines() throws Exception {
        // Initialize the database
        cartLineRepository.saveAndFlush(cartLine);

        // Get all the cartLineList
        restCartLineMockMvc.perform(get("/api/cart-lines?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cartLine.getId().intValue())))
            .andExpect(jsonPath("$.[*].quantity").value(hasItem(DEFAULT_QUANTITY)))
            .andExpect(jsonPath("$.[*].unitPrice").value(hasItem(DEFAULT_UNIT_PRICE.doubleValue())))
            .andExpect(jsonPath("$.[*].expired").value(hasItem(DEFAULT_EXPIRED.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getCartLine() throws Exception {
        // Initialize the database
        cartLineRepository.saveAndFlush(cartLine);

        // Get the cartLine
        restCartLineMockMvc.perform(get("/api/cart-lines/{id}", cartLine.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(cartLine.getId().intValue()))
            .andExpect(jsonPath("$.quantity").value(DEFAULT_QUANTITY))
            .andExpect(jsonPath("$.unitPrice").value(DEFAULT_UNIT_PRICE.doubleValue()))
            .andExpect(jsonPath("$.expired").value(DEFAULT_EXPIRED.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingCartLine() throws Exception {
        // Get the cartLine
        restCartLineMockMvc.perform(get("/api/cart-lines/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCartLine() throws Exception {
        // Initialize the database
        cartLineRepository.saveAndFlush(cartLine);

        int databaseSizeBeforeUpdate = cartLineRepository.findAll().size();

        // Update the cartLine
        CartLine updatedCartLine = cartLineRepository.findById(cartLine.getId()).get();
        // Disconnect from session so that the updates on updatedCartLine are not directly saved in db
        em.detach(updatedCartLine);
        updatedCartLine
            .quantity(UPDATED_QUANTITY)
            .unitPrice(UPDATED_UNIT_PRICE)
            .expired(UPDATED_EXPIRED);

        restCartLineMockMvc.perform(put("/api/cart-lines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCartLine)))
            .andExpect(status().isOk());

        // Validate the CartLine in the database
        List<CartLine> cartLineList = cartLineRepository.findAll();
        assertThat(cartLineList).hasSize(databaseSizeBeforeUpdate);
        CartLine testCartLine = cartLineList.get(cartLineList.size() - 1);
        assertThat(testCartLine.getQuantity()).isEqualTo(UPDATED_QUANTITY);
        assertThat(testCartLine.getUnitPrice()).isEqualTo(UPDATED_UNIT_PRICE);
        assertThat(testCartLine.isExpired()).isEqualTo(UPDATED_EXPIRED);

        // Validate the CartLine in Elasticsearch
        verify(mockCartLineSearchRepository, times(1)).save(testCartLine);
    }

    @Test
    @Transactional
    public void updateNonExistingCartLine() throws Exception {
        int databaseSizeBeforeUpdate = cartLineRepository.findAll().size();

        // Create the CartLine

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCartLineMockMvc.perform(put("/api/cart-lines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cartLine)))
            .andExpect(status().isBadRequest());

        // Validate the CartLine in the database
        List<CartLine> cartLineList = cartLineRepository.findAll();
        assertThat(cartLineList).hasSize(databaseSizeBeforeUpdate);

        // Validate the CartLine in Elasticsearch
        verify(mockCartLineSearchRepository, times(0)).save(cartLine);
    }

    @Test
    @Transactional
    public void deleteCartLine() throws Exception {
        // Initialize the database
        cartLineRepository.saveAndFlush(cartLine);

        int databaseSizeBeforeDelete = cartLineRepository.findAll().size();

        // Delete the cartLine
        restCartLineMockMvc.perform(delete("/api/cart-lines/{id}", cartLine.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<CartLine> cartLineList = cartLineRepository.findAll();
        assertThat(cartLineList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the CartLine in Elasticsearch
        verify(mockCartLineSearchRepository, times(1)).deleteById(cartLine.getId());
    }

    @Test
    @Transactional
    public void searchCartLine() throws Exception {
        // Initialize the database
        cartLineRepository.saveAndFlush(cartLine);
        when(mockCartLineSearchRepository.search(queryStringQuery("id:" + cartLine.getId())))
            .thenReturn(Collections.singletonList(cartLine));
        // Search the cartLine
        restCartLineMockMvc.perform(get("/api/_search/cart-lines?query=id:" + cartLine.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cartLine.getId().intValue())))
            .andExpect(jsonPath("$.[*].quantity").value(hasItem(DEFAULT_QUANTITY)))
            .andExpect(jsonPath("$.[*].unitPrice").value(hasItem(DEFAULT_UNIT_PRICE.doubleValue())))
            .andExpect(jsonPath("$.[*].expired").value(hasItem(DEFAULT_EXPIRED.booleanValue())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CartLine.class);
        CartLine cartLine1 = new CartLine();
        cartLine1.setId(1L);
        CartLine cartLine2 = new CartLine();
        cartLine2.setId(cartLine1.getId());
        assertThat(cartLine1).isEqualTo(cartLine2);
        cartLine2.setId(2L);
        assertThat(cartLine1).isNotEqualTo(cartLine2);
        cartLine1.setId(null);
        assertThat(cartLine1).isNotEqualTo(cartLine2);
    }
}
