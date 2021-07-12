const logger = require('../../../loggerConfig/logger');

class ElasticSearchService {
  static async bulkInsert({ index, items }) {
    // Ignore when index is exists
    await EsClient.indices.create({
      index,
    }, { ignore: [400] });

    const bulkPayload = [];
    items.forEach((item) => {
      bulkPayload.push({
        index: {
          _index: index,
        },
      });
      bulkPayload.push(item);
    });

    await EsClient.bulk({ refresh: true, body: bulkPayload });

    logger.log('info', {
      category: 'ElasticSearchService',
      payload: {
        payload: items,
        stage: 'DidbulkInsert',
      },
    });
  }

  static async freeTextSearchByAllField({ index, searchKey, searchFields }) {
    const { body } = await EsClient.search({
      index,
      body: {
        query: {
          query_string: {
            query: `*${searchKey}*`,
            fields: searchFields,
          },
        },
      },
    });

    logger.log('info', {
      category: 'ElasticSearchService',
      payload: {
        searchKey,
        body,
        payload: body?.hits?.hits,
        stage: 'DidFreeTextSearchByAllField',
      },
    });

    return body?.hits?.hits;
  }

  static async recommendationSearch({ index, suggestionKey, searchFields }) {
    const { body } = await EsClient.search({
      index,
      body: {
        query: {
          more_like_this: {
            fields: searchFields,
            like: [{ _id: suggestionKey }],
            min_term_freq: 1,
            max_query_terms: 20,
          },
        },
      },
    });

    logger.log('info', {
      category: 'ElasticSearchService',
      payload: {
        suggestionKey,
        body,
        payload: body?.hits?.hits,
        stage: 'DidRecommendationSearch',
      },
    });

    return body?.hits?.hits;
  }
}

module.exports = ElasticSearchService;
