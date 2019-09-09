package com.bof.games.repository.search;

import com.bof.games.domain.Review;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Review} entity.
 */
public interface ReviewSearchRepository extends ElasticsearchRepository<Review, Long> {
}
