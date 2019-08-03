var express = require('express');
var router = express.Router();
const generator = require('generate-password')
const bcrypt = require('bcrypt')
const User = require('../models/db').User
const UserType = require('../models/db').UserType
const sessionService = require('../services/session')
const extractUser = require('../middlewares/middlewares').extractUser
const redirectLogin = require('../middlewares/middlewares').redirectLogin

const saltRound = 10 
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API)
let msg = {
  to: 'tremainekbuchanan@gmail.com',
  from: 'tremainekbuchanan@gmail.com',
  subject: 'Welcome to Stock Mgmt App',
  text: ''
};

/* GET users listing. */
router.get('/users', redirectLogin, extractUser, (req, res, next) => {
  User.find({'isDeleted': false})
      .select('-password')
      .limit(50)
      .populate('userType')
      .exec((err, users)=>{
        const viewData = {
          title: 'Users', 
          users: users,
          user: res.locals.user
        }
        res.render('users/index', { viewData: viewData })
  })  
});

router.get('/users/new', redirectLogin, extractUser, (req, res, next)=>{
  UserType.find().exec((err, usertypes)=>{
    let showMessage = null
    let message = {
      text: 'User was successfully created. An email was sent to the provided email.',
      success: true
    }

    if(req.query.success){
      showMessage = true
      if(req.query.success !== 'true'){
        message.success = false
        message.text = 'An error occurred while attempting to create user.'
      }     
    }
    const viewData = {
       title: 'Users | Create', 
       usertypes: usertypes, 
       showMessage: showMessage, message: message,
       user: res.locals.user
      }    
    res.render('users/create', {viewData: viewData})
  })  
})


router.post('/users', (req, res, next)=>{
  User.find({"email": req.body.email}).exec((err, user)=>{
    if (user) res.redirect('/users/new?success=false&error=account_exists')
  })
  let user = new User(req.body)
  let password = generator.generate({
    length: 20
  })
  bcrypt.hash(password, saltRound, function(err, hash){
    user.password = hash  
    user.save(err => {
      if (err) console.log(err)
      // msg.text = password
      // sgMail.send(msg, (error, result)=>{
      //   if(error) console.log(error)
      //   else{
      //     console.log('mail sent')
      //   }
      // })
      return res.redirect('/users/new?success=true')
    }) 
  })  
})

router.post('/usertypes', (req, res, next)=>{
  let userType = new UserType(req.body)
  userType.save((err)=>{
    if(err) console.log(err)
    res.json(`UserType with id ${userType._id} successfully created`)
  })
})

router.post('/users/authenticate', (req, res, next)=>{
  User.findOne({'email': req.body.email}).exec((err, user)=>{
    if(!user) res.redirect('/login?success=false&user=false')
    else{     
      bcrypt.compare(req.body.password, user.password, (err, result)=>{
        if(err){
          console.log(err)
          return res.redirect('/login?success=false')
        }
        req.session.user = {"userid": user._id, "email": user.email}
        res.user = user
        res.locals.user = user
        sessionService.create(req.sessionID, user._id)
        return res.redirect('/')
      })
    }
  })
})

router.get('/users/logout', async (req, res) => {
  req.session.destroy()
  res.clearCookie("_stock")
  sessionService.remove(req.sessionID)
  res.redirect('/login')
})

module.exports = router;
