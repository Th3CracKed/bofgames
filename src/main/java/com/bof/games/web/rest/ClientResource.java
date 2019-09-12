package com.bof.games.web.rest;

import com.bof.games.domain.Cart;
import com.bof.games.domain.CartLine;
import com.bof.games.domain.Client;
import com.bof.games.domain.Item;
import com.bof.games.repository.ClientRepository;
import com.bof.games.repository.ItemRepository;
import com.bof.games.repository.UserRepository;
import com.bof.games.repository.search.ClientSearchRepository;
import com.bof.games.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing {@link com.bof.games.domain.Client}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ClientResource {

    private final Logger log = LoggerFactory.getLogger(ClientResource.class);

    private static final String ENTITY_NAME = "client";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ClientRepository clientRepository;

    private final ClientSearchRepository clientSearchRepository;

    private final UserRepository userRepository;

    public ClientResource(ClientRepository clientRepository, ClientSearchRepository clientSearchRepository, UserRepository userRepository) {
        this.clientRepository = clientRepository;
        this.clientSearchRepository = clientSearchRepository;
        this.userRepository = userRepository;
    }

    /**
     * {@code POST  /clients} : Create a new client.
     *
     * @param client the client to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new client, or with status {@code 400 (Bad Request)} if the client has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/clients")
    public ResponseEntity<Client> createClient(@RequestBody Client client) throws URISyntaxException {
        log.debug("REST request to save Client : {}", client);
        if (client.getId() != null) {
            throw new BadRequestAlertException("A new client cannot already have an ID", ENTITY_NAME, "idexists");
        }
        if (Objects.isNull(client.getUser())) {
            throw new BadRequestAlertException("Invalid association value provided", ENTITY_NAME, "null");
        }
        Long userId = client.getUser().getId();
        userRepository.findById(userId).ifPresent(client::user);
        Client result = clientRepository.save(client);
        clientSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/clients/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /clients} : Updates an existing client.
     *
     * @param client the client to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated client,
     * or with status {@code 400 (Bad Request)} if the client is not valid,
     * or with status {@code 500 (Internal Server Error)} if the client couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/clients")
    public ResponseEntity<Client> updateClient(@RequestBody Client client) throws URISyntaxException {
        log.debug("REST request to update Client : {}", client);
        if (client.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Client result = clientRepository.save(client);
        clientSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, client.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /clients} : get all the clients.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of clients in body.
     */
    @GetMapping("/clients")
    @Transactional(readOnly = true)
    public List<Client> getAllClients() {
        log.debug("REST request to get all Clients");
        return clientRepository.findAll();
    }

    /**
     * {@code GET  /clients/:id} : get the "id" client.
     *
     * @param id the id of the client to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the client, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/clients/{id}")
    @Transactional(readOnly = true)
    public ResponseEntity<Client> getClient(@PathVariable Long id) {
        log.debug("REST request to get Client : {}", id);
        Optional<Client> client = clientRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(client);
    }

    /**
     * {@code DELETE  /clients/:id} : delete the "id" client.
     *
     * @param id the id of the client to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/clients/{id}")
    public ResponseEntity<Void> deleteClient(@PathVariable Long id) {
        log.debug("REST request to delete Client : {}", id);
        clientRepository.deleteById(id);
        clientSearchRepository.deleteById(id);
        userRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/clients?query=:query} : search for the client corresponding
     * to the query.
     *
     * @param query the query of the client search.
     * @return the result of the search.
     */
    @GetMapping("/_search/clients")
    public List<Client> searchClients(@RequestParam String query) {
        log.debug("REST request to search Clients for query {}", query);
        return StreamSupport
            .stream(clientSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }


}
