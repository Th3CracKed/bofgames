package fr.bofgames.repository.search;

import fr.bofgames.domain.Key;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Key} entity.
 */
public interface KeySearchRepository extends ElasticsearchRepository<Key, Long> {
}
