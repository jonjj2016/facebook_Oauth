const User = require('../models/user');
const jwt = require('jsonwebtoken');

const signToken = (user) => {
  const token= jwt.sign({
    sub: user._id,
    iat: new Date().getTime(),
    exp:new Date().setDate(new Date().getDate()+10)
  }, process.env.JWT_SECRET);
  return token
}

exports.signup =async (req, res) => {
  const { email, password } = req.value.body;
  const existUser = await User.findOne({ email });
  if (existUser) {
    return res.status(403).json({error:"user already exist"})
  }
  const user = new User({ email, password });
  
  await user.save()
  
  const token = signToken(user);

  // const user=await User.create({email,password})
  res.status(200).json({status:true,token})
}

exports.signupFacebook = async (req, res) => {
  console.log(req);
  // const { email, password } = req.value.body;
  // const existUser = await User.findOne({ email });
  // if (existUser) {
  //   return res.status(403).json({error:"user already exist"})
  // }
  // const user = new User({ email, password });
  
  // await user.save()
  
  // const token = signToken(user);

  // const user=await User.create({email,password})
  res.status(200).json({status:true})
}


exports.signIn = (req, res) => {

  
  const token= signToken(req.user);
  res.status(200).json({ status:true,token });
  
};

exports.secret = (req, res) => {
  console.log("i managed to get here");
  res.status(200).json({msg:true})
  
}