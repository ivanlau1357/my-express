const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VedioContentSchema = new Schema({
    title: { type: String, required: true },
    summary: { type: String, required: true },
    contentType: {type: String, required: true },
    genre: { type: String, required: true },
    category: { type: String, required: true },
    casts: { type: Array },
});

class VedioContent {
    static model = new mongoose.model('VedioContent', VedioContentSchema)
  
    // static async listingPolls({limit = 25, page = 0}) {
    //   let result;
    //   try {
    //     result = await this.model.find({}).skip(page*limit).limit(limit).sort({publishedDate: -1});
    //   } catch (error) {
    //     throw error;
    //   }
    //   return result
    // }

    // static async findById({targetId}) {
    //   let result;
    //   try {
    //     result = await this.model.findById(targetId)
    //   } catch (error) {
    //     throw error;
    //   }
    //   return result;
    // }

    static async insertMany({vedioContentList}) {
      if(!vedioContentList || !vedioContentList.length) {
        return null;
      }

      let result

      try {
        result = await this.model.insertMany(vedioContentList) 
      } catch(e) {
        console.log(e)
        throw e
      }

      return result;
    }

    // static async insertOne(obj) {
    //   const { name } = obj
    //   const health = new this.model({
    //     name,
    //   })
    //   return health.save();
    // }
  }
  
  module.exports = VedioContent;