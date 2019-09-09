package com.bof.games.repository.search;

import com.bof.games.domain.Item;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Item} entity.
 */
public interface ItemSearchRepository extends ElasticsearchRepository<Item, Long> {
}
