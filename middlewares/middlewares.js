const { User } = require('../models/user');
const sessionService = require('../services/session')

module.exports = {
    sessionChecker : (req, res, next)=>{
        if (req.session.user && req.cookies._stock) {
            res.redirect('/');
        } else {
            next();
        }
    },
  redirectLogin: (req, res, next) => {
    if (!req.session) res.redirect('/login');
    if (!req.session.user) {
      res.clearCookie('_stock');
      res.redirect('/login');
    } else next();
  },
  redirectHome: (req, res, next) => {
    if (!req.session) res.redirect('/login');
    if (req.session.user) res.redirect('/');
    else next();
  },
    extractUser: async (req, res, next) => {
        if(req.session && req.session.user){
            const { user } = req.session
            const result = await User.findOne({ email: user.email})
            res.locals.user = { userid: result._id, email: result.email }
        } 
        next()
    },
    setMessage: async (req, res, next) => {
        console.log(req.message)
        next()
    }
}