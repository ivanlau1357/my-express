const Wallet = require('../models/Wallet');
const WalletTransationLog = require('../models/WalletTransationLog');

class WalletService {
  static async insertWalletList({ walletList }) {
    const result = await Wallet.insertMany({ walletList });
    return result;
  }

  static async deposit({ walletId, amount }) {
    if (!walletId || !amount) {
      return 'deposit require walletId & amout in requset body';
    }

    const wallet = await Wallet.findOne({ walletId });

    if (!wallet) {
      return 'you dont register wallet in our system';
    }

    const transactions = {
      fromWallet: null,
      toWallet: walletId,
      amount,
    };
    const result = await WalletTransationLog.deposit({ transactions });

    return result;
  }

  static async balance({ walletId }) {
    if (!walletId) {
      return 'missing walletId';
    }
    const wallet = await Wallet.findOne({ walletId });

    if (!wallet) {
      return 'you dont register wallet in our system';
    }

    const result = await WalletTransationLog.balance({ walletId });

    return result;
  }

  static async withdraw({ walletId, amount }) {
    if (!walletId || !amount) {
      return 'deposit require walletId & amout in requset body';
    }

    const currentbalance = await this.balance({ walletId });

    if (currentbalance < amount) {
      return `Cannot withdraw! because you withdraw amount(${amount}) exceed than your balance(${currentbalance})`;
    }

    const transactions = {
      fromWallet: walletId,
      toWallet: null,
      amount,
    };
    const result = await WalletTransationLog.withdraw({ transactions });

    return result;
  }

  static async sendMoney({ walletId, payee, amount }) {
    const currentbalance = await this.balance({ walletId });

    if (currentbalance < amount) {
      return `Transactions! because your sending amount(${amount}) exceed than your balance(${currentbalance})`;
    }

    const payeeWallet = await Wallet.findByPhone({ phone: payee });

    if (!payeeWallet) {
      return 'payee wallet is not exist';
    }

    const transactions = {
      fromWallet: walletId,
      toWallet: payeeWallet.id,
      amount,
    };

    const result = await WalletTransationLog.sendMoney({ transactions });

    return result;
  }
}

module.exports = WalletService;
