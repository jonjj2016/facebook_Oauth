const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    requiired: true,
    lowercase:true,
    unique:true,
  },
  password: {
    type: String,
    requiired:true
  }
}, {
  timestamps:true
});
userSchema.pre('save', async function (next) {
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next()
  } catch (error) {
    
  }
  
});
userSchema.methods.isMatchPassword=async function (password) {
  try {
    return await bcrypt.compare(password,this.password)
  } catch (error) {
    
    throw new Error(error)
  }
}
module.exports=  mongoose.model("user",userSchema)