const { User } = require('../models/user');

module.exports = {
  create: async (user) => new User(user).save(),
};
