package com.bof.games.repository;

import com.bof.games.domain.Platform;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Platform entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PlatformRepository extends JpaRepository<Platform, Long> {

}
