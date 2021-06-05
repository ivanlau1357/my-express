const logger = require('../../loggerConfig/logger')
const Promise = require("bluebird");
const CryptonatorService = require('./CryptonatorService')

class StockService {
    static async getStockPrice(stocks) {
        logger.log('info', {
            category: 'StockService',
            payload: {
                stage: 'DoGetStockPrice',
            }
        });
        
        const stocksRes = await Promise.map(stocks, async(stock) => {
            const stockKey = this.stockKeyMapper(stock);
            const stockTicker = await CryptonatorService.getStockInfo(stockKey)   
            return {
                name: stock,
                price: stockTicker?.price,
                volume: stockTicker?.volume,
                change: stockTicker?.change
            }        
        })
      
      return stocksRes
    }

    static stockKeyMapper(stock) {
        const map = {
            bitcoin: 'btc',
            ether: 'eth',
            litecoin:'ltc',
            monero: 'xmr',
            ripple: 'xrp',
            dogecoin: 'doge',
            dash: 'dash',
            maidsafeecoin: 'maid',
            lisk: 'lsk',
            storjconX: 'sjcx',
        }
        return map[stock]

    }
  }
  
module.exports = StockService