package com.bof.games.service;

import com.bof.games.domain.Client;
import com.bof.games.domain.User;
import com.bof.games.repository.ClientRepository;
import com.bof.games.repository.search.ClientSearchRepository;
import com.bof.games.service.dto.UserDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.CacheManager;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Objects;

@Service
@Transactional
public class ClientService {

    private final Logger log = LoggerFactory.getLogger(ClientService.class);

    private final UserService userService;

    private final ClientRepository clientRepository;

    private final ClientSearchRepository clientSearchRepository;

    private final CacheManager cacheManager;


    ClientService(UserService userService, ClientRepository clientRepository, ClientSearchRepository clientSearchRepository, CacheManager cacheManager) {
        this.userService = userService;
        this.clientRepository = clientRepository;
        this.clientSearchRepository = clientSearchRepository;
        this.cacheManager = cacheManager;
    }

    public Client createClient(UserDTO userDTO) {
        User newUser = userService.createUser(userDTO);
        Client client = new Client();
        client.setUser(newUser);
        clientRepository.save(client);
        clientSearchRepository.save(client);
        return client;
    }

    public Client registerClient(UserDTO userDTO, String password) {
        User newUser = userService.registerUser(userDTO, password);
        Client client = new Client();
        client.setUser(newUser);
        clientRepository.save(client);
        clientSearchRepository.save(client);
        return client;
    }

    /**
     * Not activated users should be automatically deleted after 3 days.
     * <p>
     * This is scheduled to get fired everyday, at 01:00 (am).
     */
    @Scheduled(cron = "0 0 1 * * ?")
    public void removeNotActivatedClients() {
        List<User> usersToDelete = userService.findNotActivatedUsersAfterThreeDays();

        usersToDelete.forEach(user -> {
            String clientLogin = user.getLogin();
            log.debug("Deleting not activated user {}", clientLogin);
            deleteClient(clientLogin);
        });
    }

    public void deleteClient(String login) {
        userService.getUserByLogin(login).ifPresent(user -> {
            clientRepository.findOneById(user.getId()).ifPresent(client -> {
                clientRepository.delete(client);
                clientSearchRepository.delete(client);
                log.debug("Deleted Client: {}", client);
                userService.deleteUser(user.getLogin());
            });
        });
    }

    private void clearClientCaches(Client client) {
        Objects.requireNonNull(cacheManager.getCache(ClientRepository.CLIENTS_BY_ID_CACHE)).evict(client.getId());
    }

}
