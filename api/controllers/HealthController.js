const HealthService = require('../services/HealthService');

class HealthController {
    static async health(req, res) {
      return res.status(200).send('I am a healthy')
    }
    static async healthService(req, res) {
      const healthMsg = await HealthService.getHealthServiceMsg();
      console.log('healthMsg----------', healthMsg);
      return res.status(200).send(healthMsg)
    }
    
  }
  
module.exports = HealthController