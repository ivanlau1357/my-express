const VedioContent = require('../models/VedioContent');
const ElasticSearchService = require('./elasticSearch/ElasticSearchService')
const Promise = require("bluebird");

class VedioContentService {
    // static async listingPolls({limit, page, voteInfo}) {
    //   const result = await Poll.listingPolls({limit, page})

    //   if(!voteInfo) {
    //     return result;
    //   }
      
    //   const resultWithVoteInfo  = await Promise.map(result, async(poll) => {
    //     const { id } = poll;
    //     const voteInfo = await PollActiviryLog.getVoteInfo({pollId: id})
    //     const massagedVoteInfo = voteInfo.reduce((acc, voteInfo) => {
    //     return {
    //         ...acc,
    //         [voteInfo._id]: voteInfo.count,
    //       }
    //     }, {})
    //     const pollObj = poll.toJSON()
    //     return {
    //       ...pollObj,
    //       ...(Object.keys(massagedVoteInfo).length ? {voteInfo: massagedVoteInfo} : {}),
    //     }        
    //   })
      
    //   return resultWithVoteInfo;
    // }

    // static async findById({targetId}) {
    //   const result = await Poll.findById({targetId});
    //   const voteInfo = await PollActiviryLog.getVoteInfo({pollId: targetId})
    //   const massagedVoteInfo = voteInfo.reduce((acc, voteInfo) => {
    //     return {
    //       ...acc,
    //       [voteInfo._id]: voteInfo.count,
    //     }
    //   }, {})
    //   const pollObj = result.toJSON();
    //   return {
    //     ...pollObj,
    //     ...(Object.keys(massagedVoteInfo).length ? {voteInfo: massagedVoteInfo} : {}),
    //   };
    // }

    static async insertVedioContentList({vedioContentList}) {
      //add to elasticSearch index
      await ElasticSearchService.bulkInsert({index: 'vedio-content', items: vedioContentList})
      //add to mongoDB  
      const result = await VedioContent.insertMany({vedioContentList});
      return result;
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
  }
  
module.exports = VedioContentService