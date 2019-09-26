package com.bof.games.service;

import com.bof.games.domain.*;
import com.bof.games.domain.enumeration.KEYSTATUS;
import com.bof.games.repository.*;
import com.bof.games.repository.search.*;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.List;

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

        gameRepository.save(new Game().name("City Bus Simulator 2018").description("Faites l'expérience du transport de passagers à travers une grande ville impressionnante. Avec le dernier modèle de bus urbain dans la circulation entouré de piétons. Suivez de nombreux itinéraires et débloquez-en de nouveaux en gagnant de l’argent."));
        gameRepository.save(new Game().name("Race to mars").description("un jeu de simulation de compagnie spatiale au tour par tour. Devenez le chef de la société «New Space» nouvellement créée, dont le but serait d’établir une colonie sur Mars. "));
        gameRepository.save(new Game().name("3D Paraglider").description("Vous rêvez de voler sans restrictions et de vous rapprocher le plus possible de Dame Nature? Si oui, alors 3D Paraglider est fait pour vous."));
        gameRepository.save(new Game().name("Pro Fishing Simulator").description("Pro Fishing Simulator est une simulation de pêche sportive authentique pour les débutants et les passionnés de la pêche."));
        List<Platform> platforms = platformRepository.findAll();
        List<Game> games = gameRepository.findAll();


            Item item1 = new Item()
                .price(23.3)
                .isBuyable(true)
                .game(games.get(0))
                .platform(platforms.get(0));
            Item item2 = new Item()
            .price(27.3)
            .isBuyable(true)
            .game(games.get(1))
            .platform(platforms.get(0));

            Item item3 = new Item()
            .price(33.3)
            .isBuyable(true)
            .game(games.get(2))
            .platform(platforms.get(1));

            Item item4 = new Item()
            .price(11.2)
            .isBuyable(true)
            .game(games.get(3))
            .platform(platforms.get(2));
            itemRepository.save(item1);
            itemRepository.save(item2);
            itemRepository.save(item3);
            itemRepository.save(item4);


        tagRepository.save(new Tag().name("Action"));
        tagRepository.save(new Tag().name("FPS"));
        tagRepository.save(new Tag().name("RPG"));

        List<Item> items = itemRepository.findAll();
        keyRepository.save(new Key().value("9F453-I8888-8359R").status(KEYSTATUS.AVAILABLE).item(items.get(0)));
        keyRepository.save(new Key().value("PT38S-RNN3T-47BS4").status(KEYSTATUS.AVAILABLE).item(items.get(0)));
        keyRepository.save(new Key().value("5P65P-85R23-NS4T9").status(KEYSTATUS.AVAILABLE).item(items.get(1)));
        keyRepository.save(new Key().value("55HCH-D5EC9-66676").status(KEYSTATUS.AVAILABLE).item(items.get(1)));
        keyRepository.save(new Key().value("LG6P7-7SGKG-73NGR").status(KEYSTATUS.AVAILABLE).item(items.get(2)));
        keyRepository.save(new Key().value("FS6P7-7FSQG-13NGR").status(KEYSTATUS.AVAILABLE).item(items.get(3)));

        mediaRepository.save(new Media().url("https://dl.dropboxusercontent.com/s/pddlbjc6fasyiez/city_bus.jpg").alt("City Bus Simulator 2018 logo").game(games.get(0)));
        mediaRepository.save(new Media().url("https://dl.dropboxusercontent.com/s/60l2ueza1t4ynmk/race_to_mars.jpg").alt("Race to mars logo").game(games.get(1)));
        mediaRepository.save(new Media().url("https://dl.dropboxusercontent.com/s/bkx501kwu0o16sk/3D_Paraglider.jpg").alt("3D Paraglider logo").game(games.get(2)));
        mediaRepository.save(new Media().url("https://dl.dropboxusercontent.com/s/q0nc83ltt6u6e40/Pro_Fishing_Simulator.jpg").alt("Pro Fishing Simulator logo").game(games.get(3)));

        fillElasticSearchRepository(gameRepository,gameSearchRepository);
        fillElasticSearchRepository(itemRepository,itemSearchRepository);
        fillElasticSearchRepository(mediaRepository,mediaSearchRepository);
    }

    private void fillElasticSearchRepository(JpaRepository repository, ElasticsearchRepository elasticsearchRepository){
        List list = repository.findAll();
        elasticsearchRepository.saveAll(list);
    }

}
