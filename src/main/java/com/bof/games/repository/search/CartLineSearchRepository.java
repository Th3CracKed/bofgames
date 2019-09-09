package com.bof.games.repository.search;

import com.bof.games.domain.CartLine;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link CartLine} entity.
 */
public interface CartLineSearchRepository extends ElasticsearchRepository<CartLine, Long> {
}
