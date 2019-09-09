package com.bof.games.repository.search;

import com.bof.games.domain.Promo;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Promo} entity.
 */
public interface PromoSearchRepository extends ElasticsearchRepository<Promo, Long> {
}
