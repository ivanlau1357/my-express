module.exports = {
    routes: [
      'GET /health HealthController.health',
      'GET /healthService HealthController.healthService',
      'GET /stock StockController.fetchStockPrice',
      'GET /polls PollController.listingPolls',
      'POST /pollOperation PollController.insertResources',
      'POST /vote PollController.vote',
      'GET /polls/:id PollController.findById',
      'POST /vedioContentOperation VedioContentController.insertResources',
    ]
}