package com.bof.games.web.rest;

import com.bof.games.domain.Cart;
import com.bof.games.domain.CartLine;
import com.bof.games.domain.Client;
import com.bof.games.domain.Item;
import com.bof.games.domain.Key;
import com.bof.games.domain.enumeration.KEYSTATUS;
import com.bof.games.repository.ClientRepository;
import com.bof.games.repository.ItemRepository;
import com.bof.games.repository.UserRepository;
import com.bof.games.repository.search.ClientSearchRepository;
import com.bof.games.web.rest.errors.BadRequestAlertException;
import com.sun.mail.iap.Response;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import io.searchbox.core.Cat;

import org.elasticsearch.index.mapper.SourceToParse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.cloudfoundry.com.fasterxml.jackson.databind.JsonNode;
import org.springframework.cloud.cloudfoundry.com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import javax.persistence.LockModeType;

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

    private final ItemRepository itemRepository;

    public addToCart(ClientRepository clientRepository, ClientSearchRepository clientSearchRepository,
            UserRepository userRepository, ItemRepository itemRepository) {
        this.clientRepository = clientRepository;
        this.clientSearchRepository = clientSearchRepository;
        this.userRepository = userRepository;
        this.itemRepository = itemRepository;
    }

    /**
     * {@code PUT  /client/cart/add/} : adding an item to a client's cart.
     *
     * @param idClient the client to update.
     * @param idItem the item to add
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
     *         the updated client, or with status {@code 400 (Bad Request)} if the
     *         client is not valid, or with status
     *         {@code 500 (Internal Server Error)} if the client couldn't be
     *         updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/client/cart/add/")
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    public ResponseEntity<String> addToCard(@RequestParam(name = "idClient") long idClient,@RequestParam(name = "idItem") long idItem) throws URISyntaxException {
        System.out.println("\n\n" + idClient + "\n\n\n");
        log.debug("REST request to add an Item into an user card whit data {}");



        Optional<Client> client = clientRepository.findById(idClient);
        if (client.get() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "client not found");
        }
        Optional<Item> item = this.itemRepository.findById(idItem);
        if (item.get() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "item not found");
        }


        Cart cart = null;
        Set<Cart> carts =  client.get().getCarts();

        if (carts == null) {
            carts = new HashSet<Cart>();
            cart = new Cart();
            cart.setDriver(client.get());
            cart.setExpired(false);
            cart.setOrdered(false);
            carts.add(cart);
            client.get().setCarts(carts);

        } else if (carts.isEmpty()) {
            cart = new Cart();
            cart.setDriver(client.get());
            cart.setExpired(false);
            cart.setOrdered(false);
            carts.add(cart);

        } else {
            for (Cart c: carts) {
                if (! c.isExpired())  {// expired is a cart that was commended
                    cart = c;
                }
            }
            if (cart == null) {
                cart = new Cart();
                cart.setDriver(client.get());
                cart.setExpired(false);
                cart.setOrdered(false);
                carts.add(cart);
            }
        }

        CartLine cartLine = null;
        Set<CartLine> cartLines = cart.getCartLines();
        if (cartLines == null) {
            System.out.println("\n\n  test 3 \n\n");

            cartLines = new HashSet<CartLine>();
            cartLine = new CartLine();
            cartLine.setQuantity(0);
            cartLine.setUnitPrice(item.get().getPrice());
            cartLine.setCart(cart);
            cartLines.add(cartLine);
            cart.setCartLines(cartLines);

        } else if (cartLines.isEmpty()) {

            System.out.println("\n\n  test 2 \n\n");

            cartLine = new CartLine();
            cartLine.setCart(cart);
            cartLine.setItem(item.get());
            cartLine.setQuantity(0);
            cartLine.setUnitPrice(item.get().getPrice());

            cartLines.add(cartLine);

        } else {
            System.out.println("\n\n  test 1 \n\n");

            for (CartLine c: cartLines) {
                if ( c.getItem() != null && c.getItem().getId() == idItem ) {
                    System.out.println("\n\n  carteline found \n\n");

                    cartLine = c;
                }
            }
            if (cartLine == null) {
                System.out.println("\n\n  cartline is not found \n\n");

                cartLine = new CartLine();
                cartLine.setCart(cart);
                cartLine.setItem( item.get() );
               // cartLine.quantity(0);
                cartLine.setQuantity(0);
                cartLine.setUnitPrice(item.get().getPrice());
                cartLines.add(cartLine);
            }
        }


        cartLine.setExpired(false);

        cartLine.setQuantity(cartLine.getQuantity()+1);
        System.out.println("\n \n "+cart.toString() + "\n\n" );

        boolean cartError = true;
        for (Key k : item.get().getKeys()) {
            if (k.getStatus() == KEYSTATUS.AVAILABLE) {
                k.setStatus(KEYSTATUS.RESERVED);
                cartLine.addKey(k);
                cartError = false;
                break;
            }
        }

        if (!cartError) {
            clientRepository.save(client.get());
            return ResponseEntity.ok()
                .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, client.get().getId().toString()))
                .body("");
        } else {
            return ResponseEntity.status(406)
                .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, client.get().getId().toString()))
                .body("");
        }
    }


    /**
     * {@code POST  /client/cart} : attach a cookie cart to a client.
     *
     * @param cartCookie  the cart to attach.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new cart, or with status {@code 400 (Bad Request)} if the cart has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/client/cart")
    public ResponseEntity<String> setCart(@RequestBody Cart cartCookie) throws URISyntaxException {
        log.debug("REST request to attach a Cart to a client : {}", cartCookie);
        if (cartCookie.getId() != null) {
            throw new BadRequestAlertException("A new cart cannot already have an ID", ENTITY_NAME, "idexists");
        }

        Client client = clientRepository.findById(cartCookie.getDriver().getId()).get();

        for(Cart c : client.getCarts()){
            if( !c.isExpired()){
                c.setExpired(true);
                for(CartLine cl : c.getCartLines()){
                    cl.setExpired(true);
                    for(Key key : cl.getKeys()){
                        key.status(KEYSTATUS.AVAILABLE);
                    }
                }
            }
        }
        this.clientRepository.save(client);

        Cart cart = null;
        cart = new Cart();
        cart.setDriver(client);
        cart.setExpired(false);
        cart.setOrdered(false);

        if(client.getCarts() == null){
            client.setCarts(new HashSet<Cart>());
        }
        client.addCart(cart);
        cart.setCartLines(new HashSet<CartLine>());

        Boolean cartError = false;

        for (CartLine cartline : cartCookie.getCartLines()) {
            cartline.setCart(cart);
            cart.addCartLine(cartline);
            cartline.setExpired(false);

            if (cartline.getKeys() == null) {
                cartline.setKeys(new HashSet<Key>());
            }

            HashSet<Key> keys = new HashSet<Key>(this.itemRepository.findById(cartline.getItem().getId()).get().getKeys());

            for(int i = 0; i < cartline.getQuantity();i++){
                System.out.println("\n\n je quantifie \n\n");
                Key keyReserved = null;
                for (Key k : keys) {
                    if (k.getStatus() == KEYSTATUS.AVAILABLE) {
                        System.out.println("\n\n j'ai une petite clé  \n\n");
                        k.setStatus(KEYSTATUS.RESERVED);
                        cartline.addKey(k);
                        keyReserved = k;
                        break;
                    }
                }

                if(keyReserved == null){
                    System.out.println("\n\n oups je n'ai pas trouvé de clé \n\n");

                    cartline.setQuantity(i+1);
                    cartError  = true;
                    break;
                }

            }
        }

        clientRepository.save(client);


        if(!cartError){
            return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, client.getId().toString()))
            .body("");
        }else{
            return ResponseEntity.status(206)
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, client.getId().toString()))
            .body("");
        }
    }
}
