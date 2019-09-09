package com.bof.games.web.rest;

import com.bof.games.domain.Key;
import com.bof.games.repository.KeyRepository;
import com.bof.games.repository.search.KeySearchRepository;
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
 * REST controller for managing {@link com.bof.games.domain.Key}.
 */
@RestController
@RequestMapping("/api")
public class KeyResource {

    private final Logger log = LoggerFactory.getLogger(KeyResource.class);

    private static final String ENTITY_NAME = "key";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final KeyRepository keyRepository;

    private final KeySearchRepository keySearchRepository;

    public KeyResource(KeyRepository keyRepository, KeySearchRepository keySearchRepository) {
        this.keyRepository = keyRepository;
        this.keySearchRepository = keySearchRepository;
    }

    /**
     * {@code POST  /keys} : Create a new key.
     *
     * @param key the key to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new key, or with status {@code 400 (Bad Request)} if the key has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/keys")
    public ResponseEntity<Key> createKey(@RequestBody Key key) throws URISyntaxException {
        log.debug("REST request to save Key : {}", key);
        if (key.getId() != null) {
            throw new BadRequestAlertException("A new key cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Key result = keyRepository.save(key);
        keySearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/keys/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /keys} : Updates an existing key.
     *
     * @param key the key to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated key,
     * or with status {@code 400 (Bad Request)} if the key is not valid,
     * or with status {@code 500 (Internal Server Error)} if the key couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/keys")
    public ResponseEntity<Key> updateKey(@RequestBody Key key) throws URISyntaxException {
        log.debug("REST request to update Key : {}", key);
        if (key.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Key result = keyRepository.save(key);
        keySearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, key.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /keys} : get all the keys.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of keys in body.
     */
    @GetMapping("/keys")
    public List<Key> getAllKeys() {
        log.debug("REST request to get all Keys");
        return keyRepository.findAll();
    }

    /**
     * {@code GET  /keys/:id} : get the "id" key.
     *
     * @param id the id of the key to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the key, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/keys/{id}")
    public ResponseEntity<Key> getKey(@PathVariable Long id) {
        log.debug("REST request to get Key : {}", id);
        Optional<Key> key = keyRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(key);
    }

    /**
     * {@code DELETE  /keys/:id} : delete the "id" key.
     *
     * @param id the id of the key to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/keys/{id}")
    public ResponseEntity<Void> deleteKey(@PathVariable Long id) {
        log.debug("REST request to delete Key : {}", id);
        keyRepository.deleteById(id);
        keySearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/keys?query=:query} : search for the key corresponding
     * to the query.
     *
     * @param query the query of the key search.
     * @return the result of the search.
     */
    @GetMapping("/_search/keys")
    public List<Key> searchKeys(@RequestParam String query) {
        log.debug("REST request to search Keys for query {}", query);
        return StreamSupport
            .stream(keySearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
