module.exports = {
    routes: [
      'GET /health HealthController.health',
      'GET /healthService HealthController.healthService',
      'GET /stock StockController.fetchStockPrice'
    ]
}