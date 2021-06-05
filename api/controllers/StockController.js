const StockService = require('../services/StockService');
const logger = require('../../loggerConfig/logger')

class StockController {
    static async fetchStockPrice(req, res) {
        logger.log('info', {
            category: 'StockController',
            payload: {
                query: req?.query,
                stage: 'DoFetchStockPrice',
            }
        });
        const { stocks } = req?.query;
        const result = await StockService.getStockPrice(stocks);
        res.header("Access-Control-Allow-Origin", "*");
        return res.status(200).send(result);
    }
    

  }
  
module.exports = StockController