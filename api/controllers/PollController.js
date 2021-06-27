const { polls } = require('../resources/pollingList');
const PollService = require('../services/PollService');

class PollController {
    static async listingPolls(req, res) {
      const {limit, page, voteInfo} = req.query
      const result = await PollService.listingPolls({limit, page, voteInfo})
      res.header("Access-Control-Allow-Origin", "*");
      return res.status(200).send(result);
    }

    static async findById(req, res) {
      const targetId = req.params.id;
      const result = await PollService.findById({targetId})
      res.header("Access-Control-Allow-Origin", "*");
      return res.status(200).send(result);
    }

    static async insertResources(req, res) {
      const pollList = polls
      const result = await PollService.insertPollingList({pollList})
      res.header("Access-Control-Allow-Origin", "*");
      return res.status(200).send(result);
    }

    static async vote(req, res) {
      const { pollId, label } = req.body
      const result = await PollService.vote({label, pollId})
      res.header("Access-Control-Allow-Origin", "*");
      return res.status(200).send(result); 
    }
  }
  
module.exports = PollController