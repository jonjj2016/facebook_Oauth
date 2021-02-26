const dotenv =  require('dotenv');
dotenv.config();
const passport = require("passport");
const jwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require("passport-jwt");
const User = require('./models/user');
const LoaclStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const FacebookTokenStrategy = require('passport-facebook');
// const FacebookTokenStrategy = require('passport-facebook-token');




//jwt strategy
const options = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: process.env.JWT_SECRET,
  
}


const verifyCallback = async (payload, done) => {
  try {
    //find the user specified in token if !user handle it otherwise return user
    const user = await User.findById(payload.sub);
    if (!user) {
      return done(null, false)
    };

    done(null, user)
      
  } catch (error) {
    done(error, false)
  }
};

passport.use(new jwtStrategy(options, verifyCallback));




//local strategy
passport.use(new LoaclStrategy({
  usernameField: "email",
}, async (email, password, done) => {
  try {
      
    // find user by the given  email
    const user = await User.findOne({ email });
  
    // if not
    if (!user) {
      return done(null, false)
    };
    // if found check password
    const isMatch = await user.isMatchPassword(password);
    if (!isMatch) {
      return done(null, false)
    }
    return done(null, user)
  } catch (error) {
    done(null, false)
  }

  // if password is not correct 
  //if user exists return user
}));
console.log(process.env.FACEBOOK_CLIENT_ID);
console.log(process.env.FACEBOOK_CLIENT_SECRET);

passport.use("facebook",new FacebookTokenStrategy({
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  callBackURL:'http://localhost:4004/users/outh/facebook/callback',
   fbGraphVersion:"v9.0"
}, (accessToken, refreshToken, profile, done) => {
    try {
      console.log("accessToken",accessToken );
      console.log("refreshToken", refreshToken);
      console.log("profile", profile);
      done(profile)
    } catch (error) {
      done(error,false,error.message)
    }
}));