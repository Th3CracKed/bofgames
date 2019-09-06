package fr.bofgames.repository.search;

import fr.bofgames.domain.Game;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Game} entity.
 */
public interface GameSearchRepository extends ElasticsearchRepository<Game, Long> {
}
