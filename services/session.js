const { Session } = require('../models/db');
const configs = require('../config/config');

module.exports = {
  index: async () => Session.find({ expiresOn: { $gte: new Date() } }).populate('userId', 'email firstName lastName'),
  create: async (sessionId, userId) => {
    const date = new Date();
    // eslint-disable-next-line radix
    const sessionLength = parseInt(configs.app.session.maxAge) / 1000;
    date.setSeconds(date.getSeconds() + sessionLength);
    const session = new Session({
      userId,
      expiresOn: date,
      sessionId,
    });
    return session.save();
  },
  remove: async (sessionId) => Session.findOneAndDelete({ sessionId }),
};
