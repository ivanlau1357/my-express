const mongoose = require('mongoose');

const { Schema } = mongoose;

const PollActivityLogSchema = new Schema({
  pollId: { type: String, required: true },
  label: { type: String, required: true },
});

class PollActivityLog {
    static model = new mongoose.model('PollActivityLog', PollActivityLogSchema)

    static async vote({ pollId, label }) {
      const activitylog = new this.model({
        pollId,
        label,
      });
      return activitylog.save();
    }

    static async getVoteInfo({ pollId }) {
      const aggregation = await this.model.aggregate([
        { $match: { pollId } },
        { $group: { _id: '$label', count: { $sum: 1 } } },
      ]);

      return aggregation;
    }
}

module.exports = PollActivityLog;
