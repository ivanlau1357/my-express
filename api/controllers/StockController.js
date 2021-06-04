const StockService = require('../services/StockService');
const logger = require('../../loggerConfig/logger')

class StockController {
    static async fetchStockPrice(req, res) {
        logger.log('info', {
            category: 'StockController',
            payload: {
                // request: req,
                stage: 'DoFetchStockPrice',
            }
        });
        //const { stocks } = req.query;
        const stocks = ['bitcoin'];
        const result = await StockService.getStockPrice(stocks);
        return res.status(200).send(result || {});
    }
    
  }
  
module.exports = StockController