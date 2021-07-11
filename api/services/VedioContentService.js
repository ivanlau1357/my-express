const VedioContent = require('../models/VedioContent');
const ElasticSearchService = require('./elasticSearch/ElasticSearchService')
const Promise = require("bluebird");

class VedioContentService {
    static async listingVedio({limit, page, category, genre}) {
      if(!category && !genre) {
        return null;
      }
      
      const result = await VedioContent.listingVedio({limit, page, category, genre})

      return result;
    }

    static async findById({targetId}) {
      if (!targetId) {
        return null;
      }
      const result = await VedioContent.findById({targetId});
      return result 
    }

    static async insertVedioContentList({vedioContentList}) {
      //add to mongoDB
      const results = await VedioContent.insertMany({vedioContentList});

      const insertedList = results.map(vedioContent => {
        const vedioContentObj = vedioContent.toJSON()
        // !!!temporarily remove mongoose instance value --> might change to lodash pick
        delete vedioContentObj['__v']
        delete vedioContentObj['_id']
        return {
          ...vedioContentObj,
          vedioContentId: vedioContent.id,
        }
      })

      // reference to mongoId with vedioContentId
      await ElasticSearchService.bulkInsert({index: 'vedio-content', items: insertedList})  
      return results;
    }

    static async searchByFreeText({searchKey}) {
      if(!searchKey) {
        return [];
      }
      
      const result = await ElasticSearchService.freeTextSearchByAllField({
        index: 'vedio-content',
        searchKey,
        searchFields: ['title', 'summary', 'contentType', 'genre', 'category']
      })
    
      return result || [];
    }

    static async getVedioRecomendation({suggestionKey}) {
      // sameple id: hyoWkHoBB8z5M3at1IrB
      if(!suggestionKey) {
        return []
      }

      const result = await ElasticSearchService.recommendationSearch({
        index: 'vedio-content',
        suggestionKey,
        searchFields: ['title', 'summary', 'category' ]
      })

      return result || [];
    }
  }
  
module.exports = VedioContentService