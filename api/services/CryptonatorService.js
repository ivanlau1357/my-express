const axios = require('axios');
const logger = require('../../loggerConfig/logger');

class CryptonatorService {
  static async getStockInfo(stock) {
    try {
      logger.log('info', {
        category: 'CryptonatorService',
        payload: {
          stage: 'DoGetStockInfo',
        },
      });

      const res = await axios.get(`https://api.cryptonator.com/api/ticker/${stock}-usd`);

      logger.log('info', {
        category: 'CryptonatorService',
        payload: {
          res: res?.data?.ticker,
          stage: 'DidGetStockInfo',
        },
      });

      return res?.data?.ticker;
    } catch (err) {
      logger.log('error', {
        category: 'CryptonatorService',
        payload: {
          stage: 'Error - GetStockInfo',
        },
      });
      return null;
    }
  }
}

module.exports = CryptonatorService;
