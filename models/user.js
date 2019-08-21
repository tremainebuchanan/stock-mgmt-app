/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-undef */
/* eslint-disable consistent-return */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

/* eslint-disable no-unused-vars */
const UserTypeSchema = new Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String },
});

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  firstName: { type: String },
  lastName: { type: String },
  isDeleted: { type: Boolean, default: false },
  password: { type: String, required: true },
  userType: { type: Schema.Types.ObjectId, ref: 'UserType' },
}, { timestamps: { createdAt: 'createdOn', updatedAt: 'updatedOn' } });

/* this keyword will not work with arrow functions */
UserSchema.pre('save', function(next) {
  const user = this;
  bcrypt.hash(user.password, 10, function(err, hash) {
    if (err) return next(err);
    user.password = hash;
    next();
  });
});

exports.User = mongoose.model('User', UserSchema);
