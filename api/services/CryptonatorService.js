const axios = require('axios');
const logger = require('../../loggerConfig/logger')

class CryptonatorService {
    static async getStockInfo(stock) {
        try {
            logger.log('info', {
                category: 'CryptonatorService',
                payload: {
                    stage: 'DoGetStockInfo',
                }
            });

            console.log(stock);

            const res = await axios.get(`https://api.cryptonator.com/api/ticker/${stock}-usd`)

            logger.log('info', {
                category: 'CryptonatorService',
                payload: {
                    stage: 'DidGetStockInfo',
                }
            });

            console.log('res----------', res.data);

            return res.data

        }catch(err) {
            logger.log('error', {
                category: 'CryptonatorService',
                payload: {
                    stage: 'Error - GetStockInfo',
                }
            });
        }
    
    }
  }
  
module.exports = CryptonatorService