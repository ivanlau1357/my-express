const mongoose = require('mongoose');

const { Schema } = mongoose;

const WalletSchema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
});

class Wallet {
    static model = new mongoose.model('Wallet', WalletSchema)

    static async insertMany({ walletList }) {
      if (!walletList || !walletList.length) {
        return null;
      }

      let result;

      try {
        result = await this.model.insertMany(walletList);
      } catch (e) {
        throw e;
      }

      return result;
    }

    static async findOne({ walletId }) {
      return this.model.findOne({ _id: walletId });
    }

    static async findByPhone({ phone }) {
      return this.model.findOne({ phone });
    }

    static async insertOne(obj) {
      const { name } = obj;
      const health = new this.model({
        name,
      });
      return health.save();
    }
}

module.exports = Wallet;
