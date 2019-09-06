package fr.bofgames.repository.search;

import fr.bofgames.domain.Media;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Media} entity.
 */
public interface MediaSearchRepository extends ElasticsearchRepository<Media, Long> {
}
