package com.bof.games.repository;

import com.bof.games.domain.CartLine;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the CartLine entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CartLineRepository extends JpaRepository<CartLine, Long> {

}
