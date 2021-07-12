const HealthService = require('../services/HealthService');

class HealthController {
  static async health(req, res) {
    return res.status(200).send('I am a healthy');
  }

  static async healthService(req, res) {
    const healthMsg = await HealthService.getHealthServiceMsg();
    return res.status(200).send(healthMsg);
  }

  static async postHealthEs(req, res) {
    await EsClient.index({
      index: 'game-of-thrones',
      body: {
        character: 'Ned Stark',
        quote: 'Winter is coming.',
      },
    });

    await EsClient.indices.refresh({ index: 'game-of-thrones' });

    return res.status(200).send('ok');
  }

  static async getHealthEs(req, res) {
    const { body } = await EsClient.search({
      index: 'game-of-thrones',
      // type: '_doc', // uncomment this line if you are using Elasticsearch ≤ 6
      body: {
        query: {
          match: { quote: 'winter' },
        },
      },
    });

    res.status(200).send(body.hits.hits);
  }
}

module.exports = HealthController;
