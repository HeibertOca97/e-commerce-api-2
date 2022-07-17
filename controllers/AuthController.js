const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/User')

const login = async(req, res) => {
  // Here going the validation or a request is created for this.
  try{
    const user = await UserModel.findOne({
      username: req.body.username
    });
    !user && res.status(401).json({status:false, error: "Wrong credentials!"});

    const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.CRYPTO_PASSWORD_SECRET);
    const passwordString = hashedPassword.toString(CryptoJS.enc.Utf8);
    
    passwordString !== req.body.password && res.status(401).json({status: false, error: "Wrong credentials!"});

    const token = jwt.sign({
      id: user._id,
      isAdmin: user.isAdmin
    }, 
    process.env.ACCESS_TOKEN_SECRET,
    {expiresIn: '1d'});
    
    const resfreshToken = jwt.sign({
      id: user._id,
      isAdmin: user.isAdmin
    }, 
    process.env.REFRESH_TOKEN_SECRET,
    {expiresIn: '1d'});

    const newData = {...user._doc, token, resfreshToken};
    const {password, ...otherProperty} = newData;

    res.status(200).json({
      success: true, 
      data: otherProperty
    });
  }catch(err){
    res.status(500).json(err);
  }

}

const register = async (req, res) => {
  const {username, email, password} = req.body;
  // Here going the validation or a request is created for this.
  
  // If all goes well, this will be saved
  const user = new UserModel({
    username,
    email,
    password: CryptoJS.AES.encrypt(password, process.env.CRYPTO_PASSWORD_SECRET).toString(),
    isAdmin: true // test
  });

  try{
    const response = await user.save();
    const {password, ...newResponse} = response._doc;
    res.status(200).json({
      success: true,
      data: newResponse
    });
  }catch(err){
    // err return {index, code}
    res.status(500).json(err);
    console.log(err);
  }
}

const refreshToken = (req, res) => {
  console.log(req.user);
  //const response = await UserModel.findOne({ _id: req.user.id });
  res.json(201).json(req.user);
}

module.exports = {
  register,
  login,
  refreshToken
}
