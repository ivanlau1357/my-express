const Poll = require('../models/Poll');
const Promise = require("bluebird");
const PollActiviryLog = require('../models/PollActivityLog')

class PollService {
    static async listingPolls({limit, page, voteInfo}) {
      const result = await Poll.listingPolls({limit, page})

      if(!voteInfo) {
        return result;
      }
      
      const resultWithVoteInfo  = await Promise.map(result, async(poll) => {
        const { id } = poll;
        const voteInfo = await PollActiviryLog.getVoteInfo({pollId: id})
        const massagedVoteInfo = voteInfo.reduce((acc, voteInfo) => {
        return {
            ...acc,
            [voteInfo._id]: voteInfo.count,
          }
        }, {})
        const pollObj = poll.toJSON()
        return {
          ...pollObj,
          ...(Object.keys(massagedVoteInfo).length ? {voteInfo: massagedVoteInfo} : {}),
        }        
      })
      
      return resultWithVoteInfo;
    }

    static async findById({targetId}) {
      const result = await Poll.findById({targetId});
      const voteInfo = await PollActiviryLog.getVoteInfo({pollId: targetId})
      const massagedVoteInfo = voteInfo.reduce((acc, voteInfo) => {
        return {
          ...acc,
          [voteInfo._id]: voteInfo.count,
        }
      }, {})
      const pollObj = result.toJSON();
      return {
        ...pollObj,
        ...(Object.keys(massagedVoteInfo).length ? {voteInfo: massagedVoteInfo} : {}),
      };
    }

    static async insertPollingList({pollList}) {
      const result = await Poll.insertMany({pollList});
      return result;
    }

    static async vote({pollId, label}) {
      if(!pollId || !label) {
        return null
      }

      const result = PollActiviryLog.vote({pollId, label})
      return result;
    }
  }
  
module.exports = PollService