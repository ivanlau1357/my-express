const StockService = require('../services/StockService');
const logger = require('../../loggerConfig/logger');

class StockController {
  static async fetchStockPrice(req, res) {
    logger.log('info', {
      category: 'StockController',
      payload: {
        query: req?.query,
        stage: 'DoFetchStockPrice',
      },
    });
    const { stocks } = req?.query;

    if (!stocks || !stocks.length) {
      return res.status(404).send({ error: 'stocks must be exists' });
    }

    const result = await StockService.getStockPrice(Array.isArray(stocks) ? stocks : [stocks]);
    res.header('Access-Control-Allow-Origin', '*');
    return res.status(200).send(result);
  }
}

module.exports = StockController;
