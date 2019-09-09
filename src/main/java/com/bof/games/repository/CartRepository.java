package com.bof.games.repository;

import com.bof.games.domain.Cart;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Cart entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {

}
