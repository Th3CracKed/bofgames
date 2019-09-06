package fr.bofgames.web.rest;

import fr.bofgames.domain.Platform;
import fr.bofgames.repository.PlatformRepository;
import fr.bofgames.repository.search.PlatformSearchRepository;
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
 * REST controller for managing {@link fr.bofgames.domain.Platform}.
 */
@RestController
@RequestMapping("/api")
public class PlatformResource {

    private final Logger log = LoggerFactory.getLogger(PlatformResource.class);

    private static final String ENTITY_NAME = "platform";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PlatformRepository platformRepository;

    private final PlatformSearchRepository platformSearchRepository;

    public PlatformResource(PlatformRepository platformRepository, PlatformSearchRepository platformSearchRepository) {
        this.platformRepository = platformRepository;
        this.platformSearchRepository = platformSearchRepository;
    }

    /**
     * {@code POST  /platforms} : Create a new platform.
     *
     * @param platform the platform to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new platform, or with status {@code 400 (Bad Request)} if the platform has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/platforms")
    public ResponseEntity<Platform> createPlatform(@RequestBody Platform platform) throws URISyntaxException {
        log.debug("REST request to save Platform : {}", platform);
        if (platform.getId() != null) {
            throw new BadRequestAlertException("A new platform cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Platform result = platformRepository.save(platform);
        platformSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/platforms/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /platforms} : Updates an existing platform.
     *
     * @param platform the platform to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated platform,
     * or with status {@code 400 (Bad Request)} if the platform is not valid,
     * or with status {@code 500 (Internal Server Error)} if the platform couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/platforms")
    public ResponseEntity<Platform> updatePlatform(@RequestBody Platform platform) throws URISyntaxException {
        log.debug("REST request to update Platform : {}", platform);
        if (platform.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Platform result = platformRepository.save(platform);
        platformSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, platform.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /platforms} : get all the platforms.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of platforms in body.
     */
    @GetMapping("/platforms")
    public List<Platform> getAllPlatforms() {
        log.debug("REST request to get all Platforms");
        return platformRepository.findAll();
    }

    /**
     * {@code GET  /platforms/:id} : get the "id" platform.
     *
     * @param id the id of the platform to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the platform, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/platforms/{id}")
    public ResponseEntity<Platform> getPlatform(@PathVariable Long id) {
        log.debug("REST request to get Platform : {}", id);
        Optional<Platform> platform = platformRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(platform);
    }

    /**
     * {@code DELETE  /platforms/:id} : delete the "id" platform.
     *
     * @param id the id of the platform to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/platforms/{id}")
    public ResponseEntity<Void> deletePlatform(@PathVariable Long id) {
        log.debug("REST request to delete Platform : {}", id);
        platformRepository.deleteById(id);
        platformSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/platforms?query=:query} : search for the platform corresponding
     * to the query.
     *
     * @param query the query of the platform search.
     * @return the result of the search.
     */
    @GetMapping("/_search/platforms")
    public List<Platform> searchPlatforms(@RequestParam String query) {
        log.debug("REST request to search Platforms for query {}", query);
        return StreamSupport
            .stream(platformSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
