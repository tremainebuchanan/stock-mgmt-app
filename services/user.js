const generator = require('generate-password');

const { User } = require('../models/user');

module.exports = {
  create: async (user) => {
    // eslint-disable-next-line no-param-reassign
    user.password = generator.generate({ length: 20 });
    new User(user).save();
  },
  index: async () => User
    .find({ isDeleted: false })
    .select('-password')
    .limit(50)
    .populate('userType'),
  remove: async (id) => User.findByIdAndRemove(id),
};
