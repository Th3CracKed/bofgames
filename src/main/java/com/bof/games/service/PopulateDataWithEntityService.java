package com.bof.games.service;

import com.bof.games.domain.*;
import com.bof.games.domain.enumeration.KEYSTATUS;
import com.bof.games.repository.*;
import com.bof.games.repository.search.*;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class PopulateDataWithEntityService {

    private final PlatformRepository platformRepository;
    private final GameRepository gameRepository;
    private final ItemRepository itemRepository;
    private final UserRepository userRepository;
    private final ClientRepository clientRepository;
    private final TagRepository tagRepository;
    private final KeyRepository keyRepository;
    private final MediaRepository mediaRepository;
    private final CartLineRepository cartLineRepository;
    private final CartRepository cartRepository;
    private final PlatformSearchRepository platformSearchRepository;
    private final GameSearchRepository gameSearchRepository;
    private final ItemSearchRepository itemSearchRepository;
    private final UserSearchRepository userSearchRepository;
    private final ClientSearchRepository clientSearchRepository;
    private final TagSearchRepository tagSearchRepository;
    private final KeySearchRepository keySearchRepository;
    private final MediaSearchRepository mediaSearchRepository;
    private final CartLineSearchRepository cartLineSearchRepository;
    private final CartSearchRepository cartSearchRepository;

    public PopulateDataWithEntityService(PlatformRepository platformRepository, GameRepository gameRepository, ItemRepository itemRepository, ItemSearchRepository itemSearchRepository, UserRepository userRepository, ClientRepository clientRepository, TagRepository tagRepository, KeyRepository keyRepository, MediaRepository mediaRepository, CartLineRepository cartLineRepository, CartRepository cartRepository, PlatformSearchRepository platformSearchRepository, GameSearchRepository gameSearchRepository, UserSearchRepository userSearchRepository, ClientSearchRepository clientSearchRepository, TagSearchRepository tagSearchRepository, KeySearchRepository keySearchRepository, MediaSearchRepository mediaSearchRepository, CartLineSearchRepository cartLineSearchRepository, CartSearchRepository cartSearchRepository) {
        this.platformRepository = platformRepository;
        this.gameRepository = gameRepository;
        this.itemRepository = itemRepository;
        this.itemSearchRepository = itemSearchRepository;
        this.userRepository = userRepository;
        this.clientRepository = clientRepository;
        this.tagRepository = tagRepository;
        this.keyRepository = keyRepository;
        this.mediaRepository = mediaRepository;
        this.cartLineRepository = cartLineRepository;
        this.cartRepository = cartRepository;
        this.platformSearchRepository = platformSearchRepository;
        this.gameSearchRepository = gameSearchRepository;
        this.userSearchRepository = userSearchRepository;
        this.clientSearchRepository = clientSearchRepository;
        this.tagSearchRepository = tagSearchRepository;
        this.keySearchRepository = keySearchRepository;
        this.mediaSearchRepository = mediaSearchRepository;
        this.cartLineSearchRepository = cartLineSearchRepository;
        this.cartSearchRepository = cartSearchRepository;
    }


    @PostConstruct
    public void initEntities() {
        try {
            // clean database
            mediaRepository.deleteAll();
            mediaSearchRepository.deleteAll();
            keyRepository.deleteAll();
            keySearchRepository.deleteAll();
            itemRepository.deleteAll();
            itemSearchRepository.deleteAll();
            platformRepository.deleteAll();
            platformSearchRepository.deleteAll();
            tagRepository.deleteAll();
            tagSearchRepository.deleteAll();
            gameRepository.deleteAll();
            gameSearchRepository.deleteAll();
            cartLineRepository.deleteAll();
            cartLineSearchRepository.deleteAll();
            cartRepository.deleteAll();
            cartSearchRepository.deleteAll();
            clientRepository.deleteAll();
            clientSearchRepository.deleteAll();
        }catch (Exception ignored){}
        platformRepository.save(new Platform().name("PS"));
        platformRepository.save(new Platform().name("PC"));
        platformRepository.save(new Platform().name("Xbox"));

        gameRepository.save(new Game().name("The last of us").description("Le survival action The Last of Us sur PS3 suit Joel et d Ellie à travers les Etats-Unis. Les deux devront s entraider pour survivre à une mystérieuse peste."));
        gameRepository.save(new Game().name("Greedfall").description("Greedfall est un Action RPG développé par Spiders et édité par Focus Home Interactive. L action prend place dans un univers fantastique, inspiré de l’Europe du 17ème siècle."));
        gameRepository.save(new Game().name("Borderlands 3").description("Borderlands 3 est un RPG en vue FPS. Contrairement aux épisodes précédents, les joueurs vont pouvoir visiter Prométhée."));

        List<Platform> platforms = platformRepository.findAll();
        List<Game> games = gameRepository.findAll();

        for(int i = 0; i < Math.min(games.size(), platforms.size()); i++) {
            Item item = new Item()
                .price(23.3 + (i*3))
                .isBuyable(true)
                .game(games.get(i))
                .platform(platforms.get(i));
            itemRepository.save(item);
        }

        tagRepository.save(new Tag().name("Action"));
        tagRepository.save(new Tag().name("FPS"));
        tagRepository.save(new Tag().name("RPG"));

        List<Item> items = itemRepository.findAll();
        keyRepository.save(new Key().value("9F453-I8888-8359R").status(KEYSTATUS.AVAILABLE).item(items.get(0)));
        keyRepository.save(new Key().value("PT38S-RNN3T-47BS4").status(KEYSTATUS.AVAILABLE).item(items.get(0)));
        keyRepository.save(new Key().value("5P65P-85R23-NS4T9").status(KEYSTATUS.AVAILABLE).item(items.get(1)));
        keyRepository.save(new Key().value("55HCH-D5EC9-66676").status(KEYSTATUS.AVAILABLE).item(items.get(1)));
        keyRepository.save(new Key().value("LG6P7-7SGKG-73NGR").status(KEYSTATUS.AVAILABLE).item(items.get(2)));

        mediaRepository.save(new Media().url("http://image.jeuxvideo.com/images-sm/jaquettes/00042999/jaquette-the-last-of-us-playstation-3-ps3-cover-avant-g-1355137960.jpg").alt("The Last Of Us Logo").game(games.get(0)));
        mediaRepository.save(new Media().url("http://image.jeuxvideo.com/medias-sm/151627/1516269237-1224-jaquette-avant.jpg").alt("Greedfall logo").game(games.get(1)));
        mediaRepository.save(new Media().url("http://image.jeuxvideo.com/medias-sm/155724/1557239235-3469-jaquette-avant.jpg").alt("Borderlands 3").game(games.get(2)));
        // Create users
        // CreateAndSaveUser("user1","dollie.guerra@mail.com","Dollie","Guerra");
        // CreateAndSaveUser("user2","Cristiano.Rosales@mail.com","Cristiano","Rosales");
        //CreateAndSaveUser("user3", "Kitty.Solis@mail.com", "Kitty", "Solis");

        // create client with theirs users
        /*for (User user : userRepository.findAll()) {
            Client client = new Client();
            client.setUser(user);
            clientRepository.save(client);
        }*/
        fillElasticSearchRepository(gameRepository,gameSearchRepository);
        fillElasticSearchRepository(itemRepository,itemSearchRepository);
        fillElasticSearchRepository(mediaRepository,mediaSearchRepository);
    }

    private void fillElasticSearchRepository(JpaRepository repository, ElasticsearchRepository elasticsearchRepository){
        List list = repository.findAll();
        elasticsearchRepository.saveAll(list);
    }
/*
    private void CreateAndSaveUser(String login, String email, String first_name, String last_name){
        User user = new User();
        user.setLogin(login);
        user.setEmail(email);
        user.setActivated(true);
        user.setFirstName(first_name);
        user.setLastName(last_name);
        Set<Authority> authorities = new HashSet<>();
        Authority role_user = new Authority();
        role_user.setName("ROLE_USER");
        authorities.add(role_user);
        user.setAuthorities(authorities);
        user.setPassword("$2a$10$krj23Ztki8Mn/BrPyURTgOMQTD0TyWeuCurUEvf/.a.Fo3Rw6v2oq");
        user.setCreatedBy("auto_generated");
        if(!userRepository.findOneByLogin(login).isPresent()) {
            userRepository.saveAndFlush(user);
            userSearchRepository.save(user);
        }
    }*/

}
