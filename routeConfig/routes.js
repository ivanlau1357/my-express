module.exports = {
    routes: [
      'GET /health HealthController.health',
      'GET /healthService HealthController.healthService',
      'POST /healthES HealthController.postHealthEs',
      'GET /healthES HealthController.getHealthEs',
      'GET /stock StockController.fetchStockPrice',
      'GET /polls PollController.listingPolls',
      'POST /pollOperation PollController.insertResources',
      'POST /vote PollController.vote',
      'GET /polls/:id PollController.findById',
      'POST /vedioContentOperation VedioContentController.insertResources',
      'GET /vedioSearch VedioContentController.search'
    ]
}