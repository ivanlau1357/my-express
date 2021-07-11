const { vedioContents } = require('../resources/vedioContents');
const VedioContentService = require('../services/VedioContentService');

class VedioContentController {
    static async listingVedio(req, res) {
      const {limit, page, category, genre} = req.query
      const result = await VedioContentService.listingVedio({limit, page, category, genre})
      res.header("Access-Control-Allow-Origin", "*");
      return res.status(200).send(result);
    }

    static async findById(req, res) {
      const targetId = req.params.id;
      const result = await VedioContentService.findById({targetId})
      res.header("Access-Control-Allow-Origin", "*");
      return res.status(200).send(result);
    }

    static async insertResources(req, res) {
      const vedioContentList = vedioContents
      const result = await VedioContentService.insertVedioContentList({vedioContentList})
      res.header("Access-Control-Allow-Origin", "*");
      return res.status(200).send(result);
    }

    static async search(req, res) {
      const searchKey = req.query['q']
      const result = await VedioContentService.searchByFreeText({searchKey})
      res.header("Access-Control-Allow-Origin", "*");
      return res.status(200).send(result); 
    }

    static async recommendation(req, res) {
      const targetId = req.params.id;
      const result = await VedioContentService.getVedioRecomendation({suggestionKey: targetId})
      res.header("Access-Control-Allow-Origin", "*");
      return res.status(200).send(result);
    }
  }
  
module.exports = VedioContentController