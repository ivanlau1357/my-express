const mongoose = require('mongoose');
const SHA256 = require('crypto-js/sha256');

const { Schema } = mongoose;

const WalletTransactionLogSchema = new Schema({
  timestamp: { type: Date, default: Date.now },
  transactions: {
    fromWallet: { type: String, default: null },
    toWallet: { type: String, default: null },
    amount: { type: Number, require: true },
  },
  prevHash: { type: String, default: null },
  hash: { type: String, require: true },
});

class WalletTransactionLog {
    static model = new mongoose.model('WalletTransactionLog', WalletTransactionLogSchema)

    static async addTransactionLog({ transactions }) {
      const walletTransaction = new this.model({
        transactions,
      });

      walletTransaction.hash = this.calculateHash(walletTransaction);
      walletTransaction.prevHash = await this.getPrevHash();

      return walletTransaction.save();
    }

    static async balance({ walletId }) {
      const aggregation = await this.model.aggregate([
        { $match: { $or: [{ 'transactions.fromWallet': walletId }, { 'transactions.toWallet': walletId }] } },
        {
          $group: {
            _id: 'result',
            balance: {
              $sum: {
                $cond: {
                  if: { $eq: ['$transactions.toWallet', walletId] },
                  then: '$transactions.amount',
                  else: { $multiply: ['$transactions.amount', -1] },
                },
              },
            },
          },
        },
      ]);
      return aggregation.length ? aggregation[0].balance : 0;
    }

    static calculateHash({ timestamp, transactions, prevHash }) {
      return SHA256(timestamp + JSON.stringify(transactions) + prevHash).toString();
    }

    static async getPrevHash() {
      const lastLog = await this.model.findOne({}, {}, { sort: { _id: -1 } });
      return lastLog ? lastLog.hash : null;
    }
}

module.exports = WalletTransactionLog;
