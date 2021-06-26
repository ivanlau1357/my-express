const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PollSchema = new Schema({
    name: { type: String, required: true },
    title: { type: String, required: true },
    publishedDate: { type: String, required: true },
    answer: { type: Object },
});

class Poll {
    static model = new mongoose.model('Poll', PollSchema)
  
    static async listingPolls({limit = 25, page = 0}) {
      let result;
      try {
        result = await this.model.find({}).skip(page*limit).limit(limit).sort({publishedDate: -1});
      } catch (error) {
        throw error;
      }
      return result
    }

    static async findById({targetId}) {
      let result;
      try {
        result = await this.model.findById(targetId)
      } catch (error) {
        throw error;
      }
      return result;
    }

    static async insertMany({pollList}) {
      if(!pollList || !pollList.length) {
        return null;
      }

      let result

      try {
        result = await this.model.insertMany(pollList) 
      } catch(e) {
        console.log(e)
        throw e
      }

      return result;
    }

    static async insertOne(obj) {
      const { name } = obj
      const health = new this.model({
        name,
      })
      return health.save();
    }
  }
  
  module.exports = Poll;