package com.bof.games.repository.search;

import com.bof.games.domain.Media;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Media} entity.
 */
public interface MediaSearchRepository extends ElasticsearchRepository<Media, Long> {
}
