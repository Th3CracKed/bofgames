package com.bof.games.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of {@link MediaSearchRepository} to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class MediaSearchRepositoryMockConfiguration {

    @MockBean
    private MediaSearchRepository mockMediaSearchRepository;

}
