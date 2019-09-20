package com.bof.games.repository;

import com.bof.games.domain.Client;
import com.bof.games.domain.User;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.Optional;


/**
 * Spring Data  repository for the Client entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ClientRepository extends JpaRepository<Client, Long> {

    String CLIENTS_BY_ID_CACHE = "clientsById";


    Optional<Client> findOneById(Long id);

}
