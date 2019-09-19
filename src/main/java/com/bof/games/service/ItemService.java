package com.bof.games.service;

import com.bof.games.domain.Item;
import org.elasticsearch.common.unit.Fuzziness;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.QueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.query.NativeSearchQuery;
import org.springframework.data.elasticsearch.core.query.NativeSearchQueryBuilder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemService {


    private final ElasticsearchOperations elasticsearchTemplate;

    public ItemService(ElasticsearchOperations elasticsearchTemplate) {
        this.elasticsearchTemplate = elasticsearchTemplate;
    }

    public List<Item> findItemsThatContainsThisString(String originalQuery){
        NativeSearchQueryBuilder nativeSearchQueryBuilder = new NativeSearchQueryBuilder();
        nativeSearchQueryBuilder.withIndices("item");
        QueryBuilder matchPhraseQuery = QueryBuilders.matchQuery("game.name", originalQuery)
            .fuzziness(Fuzziness.ONE)
            .prefixLength(3);

        NativeSearchQuery nativeSearchQuery = nativeSearchQueryBuilder.withQuery(matchPhraseQuery).build();
        return elasticsearchTemplate.queryForList(nativeSearchQuery, Item.class);
    }
}
