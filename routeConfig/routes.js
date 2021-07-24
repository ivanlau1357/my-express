module.exports = {
  routes: [
    'GET /health HealthController.health',
    'GET /health/services HealthController.healthService',
    'POST /wallet/deposit WalletController.deposit',
    'POST /wallet/withdraw WalletController.withdraw',
    'POST /wallet/sendMoney WalletController.sendMoney',
    'GET /wallet/:id/balance WalletController.balance',
    'POST /wallet WalletController.insertWallets',
  ],
};
