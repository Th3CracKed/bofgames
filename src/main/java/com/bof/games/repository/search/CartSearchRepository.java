package com.bof.games.repository.search;

import com.bof.games.domain.Cart;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Cart} entity.
 */
public interface CartSearchRepository extends ElasticsearchRepository<Cart, Long> {
}
