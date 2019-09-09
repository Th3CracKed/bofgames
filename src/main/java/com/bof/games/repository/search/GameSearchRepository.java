package com.bof.games.repository.search;

import com.bof.games.domain.Game;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Game} entity.
 */
public interface GameSearchRepository extends ElasticsearchRepository<Game, Long> {
}
