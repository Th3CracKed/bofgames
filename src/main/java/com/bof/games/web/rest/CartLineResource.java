package com.bof.games.web.rest;

import com.bof.games.domain.CartLine;
import com.bof.games.repository.CartLineRepository;
import com.bof.games.repository.search.CartLineSearchRepository;
import com.bof.games.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing {@link com.bof.games.domain.CartLine}.
 */
@RestController
@RequestMapping("/api")
public class CartLineResource {

    private final Logger log = LoggerFactory.getLogger(CartLineResource.class);

    private static final String ENTITY_NAME = "cartLine";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CartLineRepository cartLineRepository;

    private final CartLineSearchRepository cartLineSearchRepository;

    public CartLineResource(CartLineRepository cartLineRepository, CartLineSearchRepository cartLineSearchRepository) {
        this.cartLineRepository = cartLineRepository;
        this.cartLineSearchRepository = cartLineSearchRepository;
    }

    /**
     * {@code POST  /cart-lines} : Create a new cartLine.
     *
     * @param cartLine the cartLine to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new cartLine, or with status {@code 400 (Bad Request)} if the cartLine has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/cart-lines")
    public ResponseEntity<CartLine> createCartLine(@RequestBody CartLine cartLine) throws URISyntaxException {
        log.debug("REST request to save CartLine : {}", cartLine);
        if (cartLine.getId() != null) {
            throw new BadRequestAlertException("A new cartLine cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CartLine result = cartLineRepository.save(cartLine);
        cartLineSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/cart-lines/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /cart-lines} : Updates an existing cartLine.
     *
     * @param cartLine the cartLine to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cartLine,
     * or with status {@code 400 (Bad Request)} if the cartLine is not valid,
     * or with status {@code 500 (Internal Server Error)} if the cartLine couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/cart-lines")
    public ResponseEntity<CartLine> updateCartLine(@RequestBody CartLine cartLine) throws URISyntaxException {
        log.debug("REST request to update CartLine : {}", cartLine);
        if (cartLine.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CartLine result = cartLineRepository.save(cartLine);
        cartLineSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, cartLine.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /cart-lines} : get all the cartLines.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of cartLines in body.
     */
    @GetMapping("/cart-lines")
    public List<CartLine> getAllCartLines() {
        log.debug("REST request to get all CartLines");
        return cartLineRepository.findAll();
    }

    /**
     * {@code GET  /cart-lines/:id} : get the "id" cartLine.
     *
     * @param id the id of the cartLine to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the cartLine, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/cart-lines/{id}")
    public ResponseEntity<CartLine> getCartLine(@PathVariable Long id) {
        log.debug("REST request to get CartLine : {}", id);
        Optional<CartLine> cartLine = cartLineRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(cartLine);
    }

    /**
     * {@code DELETE  /cart-lines/:id} : delete the "id" cartLine.
     *
     * @param id the id of the cartLine to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/cart-lines/{id}")
    public ResponseEntity<Void> deleteCartLine(@PathVariable Long id) {
        log.debug("REST request to delete CartLine : {}", id);
        cartLineRepository.deleteById(id);
        cartLineSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/cart-lines?query=:query} : search for the cartLine corresponding
     * to the query.
     *
     * @param query the query of the cartLine search.
     * @return the result of the search.
     */
    @GetMapping("/_search/cart-lines")
    public List<CartLine> searchCartLines(@RequestParam String query) {
        log.debug("REST request to search CartLines for query {}", query);
        return StreamSupport
            .stream(cartLineSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
