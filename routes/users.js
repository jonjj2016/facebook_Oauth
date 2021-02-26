// const express = require('express');
const router = require('express-promise-router')();
const {schemas,validateBody} =require('../helpers/routeHalpers')
const passport = require('passport');
const { signup, signIn, secret,signupFacebook } = require('../controllers/user');
const passportConf = require('../passport');
const localAurh=require('passport-local').Strategy


const passportLocalStrategy = passport.authenticate("local", { session: false });
const passportJwtStrategy=passport.authenticate("jwt",{session:false})
const facebookStrategy = passport.authenticate("facebook");
// const router = express.Router();

router.route('/signup').post(validateBody(schemas.authSchema),signup);
router.route('/outh/facebook/token').post(passport.authenticate("facebook"),signupFacebook);
router.route('/outh/facebook/callback', (req, res) => {
  console.log(req);
})
router.route('/signin').post(validateBody(schemas.authSchema),passportLocalStrategy,signIn);

router.route('/secret').get(passportJwtStrategy,secret);


module.exports = router;