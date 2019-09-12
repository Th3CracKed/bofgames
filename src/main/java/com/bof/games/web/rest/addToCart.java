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
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

@RestController
@RequestMapping("/api")
public class addToCart {

    private final Logger log = LoggerFactory.getLogger(ClientResource.class);

    private static final String ENTITY_NAME = "client";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ClientRepository clientRepository;

    private final ClientSearchRepository clientSearchRepository;

    private final UserRepository userRepository;

    public addToCart(ClientRepository clientRepository, ClientSearchRepository clientSearchRepository, UserRepository userRepository) {
        this.clientRepository = clientRepository;
        this.clientSearchRepository = clientSearchRepository;
        this.userRepository = userRepository;
    }


    class Data {long idClient; long idItem;}

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
    public ResponseEntity<String> addToCard(@RequestBody Data data) throws URISyntaxException {
        log.debug("REST request to add an Item into an user card whit data {}",data);

        Optional<Client> client = clientRepository.findById(data.idClient);

        if (client == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "client not found");
        }

        Cart cart = client.get().getCart();
        if (cart == null) {
            cart = new Cart();
            cart.setDriver(client.get());
        }

        CartLine cartLine = cart.getCartLine();
        if (cartLine == null) {
            cartLine = new CartLine();
            cart.setCartLine(cartLine);
        }
        //cartLine.setItem();;


        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, client.get().getId().toString()))
            .body("");
    }
    

}