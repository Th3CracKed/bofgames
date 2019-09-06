package fr.bofgames.repository.search;

import fr.bofgames.domain.Cart;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Cart} entity.
 */
public interface CartSearchRepository extends ElasticsearchRepository<Cart, Long> {
}
