package fr.bofgames.web.rest;

import fr.bofgames.domain.Promo;
import fr.bofgames.repository.PromoRepository;
import fr.bofgames.repository.search.PromoSearchRepository;
import fr.bofgames.web.rest.errors.BadRequestAlertException;

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
 * REST controller for managing {@link fr.bofgames.domain.Promo}.
 */
@RestController
@RequestMapping("/api")
public class PromoResource {

    private final Logger log = LoggerFactory.getLogger(PromoResource.class);

    private static final String ENTITY_NAME = "promo";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PromoRepository promoRepository;

    private final PromoSearchRepository promoSearchRepository;

    public PromoResource(PromoRepository promoRepository, PromoSearchRepository promoSearchRepository) {
        this.promoRepository = promoRepository;
        this.promoSearchRepository = promoSearchRepository;
    }

    /**
     * {@code POST  /promos} : Create a new promo.
     *
     * @param promo the promo to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new promo, or with status {@code 400 (Bad Request)} if the promo has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/promos")
    public ResponseEntity<Promo> createPromo(@RequestBody Promo promo) throws URISyntaxException {
        log.debug("REST request to save Promo : {}", promo);
        if (promo.getId() != null) {
            throw new BadRequestAlertException("A new promo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Promo result = promoRepository.save(promo);
        promoSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/promos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /promos} : Updates an existing promo.
     *
     * @param promo the promo to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated promo,
     * or with status {@code 400 (Bad Request)} if the promo is not valid,
     * or with status {@code 500 (Internal Server Error)} if the promo couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/promos")
    public ResponseEntity<Promo> updatePromo(@RequestBody Promo promo) throws URISyntaxException {
        log.debug("REST request to update Promo : {}", promo);
        if (promo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Promo result = promoRepository.save(promo);
        promoSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, promo.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /promos} : get all the promos.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of promos in body.
     */
    @GetMapping("/promos")
    public List<Promo> getAllPromos() {
        log.debug("REST request to get all Promos");
        return promoRepository.findAll();
    }

    /**
     * {@code GET  /promos/:id} : get the "id" promo.
     *
     * @param id the id of the promo to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the promo, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/promos/{id}")
    public ResponseEntity<Promo> getPromo(@PathVariable Long id) {
        log.debug("REST request to get Promo : {}", id);
        Optional<Promo> promo = promoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(promo);
    }

    /**
     * {@code DELETE  /promos/:id} : delete the "id" promo.
     *
     * @param id the id of the promo to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/promos/{id}")
    public ResponseEntity<Void> deletePromo(@PathVariable Long id) {
        log.debug("REST request to delete Promo : {}", id);
        promoRepository.deleteById(id);
        promoSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/promos?query=:query} : search for the promo corresponding
     * to the query.
     *
     * @param query the query of the promo search.
     * @return the result of the search.
     */
    @GetMapping("/_search/promos")
    public List<Promo> searchPromos(@RequestParam String query) {
        log.debug("REST request to search Promos for query {}", query);
        return StreamSupport
            .stream(promoSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
