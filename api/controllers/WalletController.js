const { wallets } = require('../resources/walletList');
const WalletService = require('../services/WalletService');

class WalletController {
  static async insertWallets(req, res) {
    const walletList = wallets;
    const result = await WalletService.insertWalletList({ walletList });
    res.header('Access-Control-Allow-Origin', '*');
    return res.status(200).send(result);
  }

  static async deposit(req, res) {
    const { walletId, amount } = req.body;
    const result = await WalletService.deposit({ walletId, amount });
    res.header('Access-Control-Allow-Origin', '*');
    return res.status(200).send(result);
  }

  static async balance(req, res) {
    const walletId = req.params.id;
    const result = await WalletService.balance({ walletId });
    res.header('Access-Control-Allow-Origin', '*');
    return res.status(200).send({ balance: result });
  }

  static async withdraw(req, res) {
    const { walletId, amount } = req.body;
    const result = await WalletService.withdraw({ walletId, amount });
    res.header('Access-Control-Allow-Origin', '*');
    return res.status(200).send(result);
  }

  static async sendMoney(req, res) {
    const { walletId, payee, amount } = req.body;
    const result = await WalletService.sendMoney({ walletId, payee, amount });
    res.header('Access-Control-Allow-Origin', '*');
    return res.status(200).send(result);
  }
}

module.exports = WalletController;
