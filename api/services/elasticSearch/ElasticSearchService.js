const logger = require('../../../loggerConfig/logger')

class ElasticSearchService {
    static async bulkInsert({index, items}) {
        // Ignore when index is exists
        await EsClient.indices.create({
            index: index,
        }, { ignore: [400] })
        
        let bulkPayload = [];
        items.forEach(item => {
            bulkPayload.push({
                index: {
                    _index: index,
                }
            })
            bulkPayload.push(item)
        });

        await EsClient.bulk({refresh: true, body: bulkPayload});    
    }

    static async freeTextSearchByAllField({index, searchKey, searchFields}) {
        const { body } = await EsClient.search({
            index: index,
            body: {
                query: {
                    query_string: {
                        query: `*${searchKey}*`,
                        fields: searchFields
                    }
                }
            }
        })
        
        return body?.hits?.hits
    }

    static async recommendationSearch({index, suggestionKey, searchFields}) {
        const { body } = await EsClient.search({
            index: index,
            body: {
                query: {
                    more_like_this: {
                        fields: searchFields,
                        like: [{_id: suggestionKey}],
                        min_term_freq: 1,
                        max_query_terms: 12,
                    }
                }
            }
        })

        console.log(body);

        return body?.hits?.hits
    }
}
  
module.exports = ElasticSearchService