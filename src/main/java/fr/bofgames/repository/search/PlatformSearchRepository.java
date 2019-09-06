package fr.bofgames.repository.search;

import fr.bofgames.domain.Platform;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Platform} entity.
 */
public interface PlatformSearchRepository extends ElasticsearchRepository<Platform, Long> {
}
