package com.bof.games.repository.search;

import com.bof.games.domain.Key;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Key} entity.
 */
public interface KeySearchRepository extends ElasticsearchRepository<Key, Long> {
}
