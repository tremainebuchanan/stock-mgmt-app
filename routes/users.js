/* eslint-disable no-underscore-dangle */
const express = require('express');

const sgMail = require('@sendgrid/mail');
const bcrypt = require('bcrypt');

const router = express.Router();
const { User } = require('../models/user');
const { UserType } = require('../models/db');
const sessionService = require('../services/session');
const { extractUser } = require('../middlewares/middlewares');
const { redirectLogin } = require('../middlewares/middlewares');
const userService = require('../services/user.js');

sgMail.setApiKey(process.env.SENDGRID_API);

router.get('/users', redirectLogin, extractUser, async (req, res) => {
  const users = await userService.index();
  const viewData = {
    resource: 'user',
    title: 'Users',
    users,
    user: res.locals.user,
  };
  res.render('users/index', { viewData });
});

router.get('/users/new', redirectLogin, extractUser, (req, res) => {
  UserType.find().exec((err, usertypes) => {
    let showMessage = null;
    let message = {
      text: 'User was successfully created.',
      success: true,
    };

    if (req.query.success) {
      showMessage = true;
      if (req.query.success !== 'true') {
        message.success = false;
        message.text = 'An error occurred while attempting to create user.';
      }
    }
    const viewData = {
      title: 'Users | Create',
      usertypes,
      showMessage,
      message,
      user: res.locals.user,
    };

    res.render('users/create', { viewData });
  });
});


router.post('/users', (req, res) => {
  // eslint-disable-next-line consistent-return
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (user) return res.redirect('/users/new?success=false&error=account_exists');
    const result = userService.create(req.body);
    if (!result) return res.redirect('/users/new?success=false&error=500');
    return res.redirect('/users/new?success=true');
  });
});

router.post('/usertypes', (req, res) => {
  const userType = new UserType(req.body);
  userType.save((err) => {
    if (err) console.log(err);
    res.json(`UserType with id ${userType._id} successfully created`)
  });
});

router.post('/users/authenticate', (req, res) => {
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (!user) res.redirect('/login?success=false&user=false');
    else {
      bcrypt.compare(req.body.password, user.password, (error, result) => {
        if (error) {
          return res.redirect('/login?success=false');
        }
        req.session.user = { userid: user._id, email: user.email };
        res.user = user;
        res.locals.user = user;
        sessionService.create(req.sessionID, user._id);
        return res.redirect('/dashboard');
      });
    }
  });
});

router.get('/users/logout', async (req, res) => {
  req.session.destroy();
  res.clearCookie('_stock');
  sessionService.remove(req.sessionID);
  res.redirect('/login');
});

router.delete('/users/:id', async (req, res) => {
  const result = await userService.remove(req.params.id);
  if (!result) return res.json({ success: false });
  return res.json({
    success: true,
  });
});

module.exports = router;
