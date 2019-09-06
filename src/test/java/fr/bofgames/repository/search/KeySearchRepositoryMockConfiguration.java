package fr.bofgames.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of {@link KeySearchRepository} to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class KeySearchRepositoryMockConfiguration {

    @MockBean
    private KeySearchRepository mockKeySearchRepository;

}
