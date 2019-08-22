const generator = require('generate-password');

const { User } = require('../models/user');
const eventEmitter = require('../subscribers/listeners');

module.exports = {
  create: async (user) => {
    // eslint-disable-next-line no-param-reassign
    user.password = generator.generate({ length: 20 });
    eventEmitter.emit('user-signup', { to: user.email, password: user.password });
    new User(user).save();
  },
  index: async () => User
    .find({ isDeleted: false })
    .select('-password')
    .limit(50)
    .populate('userType'),
  remove: async (id) => User.findByIdAndRemove(id),
};
