const CryptoJS = require('crypto-js');
const UserModel = require('../models/User');
const { createAndGetToken, createAndGetRefreshToken } = require('../libs/jwt.help')

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

    const payload = {
      id: user._id,
      isAdmin: user.isAdmin,
    }

    const getToken = createAndGetToken(payload, '1h');
    const getRefreshToken = createAndGetRefreshToken(payload, '7d');

    res.status(200).json({
      success: true, 
      data: {
        token: getToken,
        refreshToken: getRefreshToken
      }
    });
  }catch(err){
    res.status(500).json(err);
  }

}

const register = async (req, res) => {
  const {username, email, password} = req.body;
  // Here going the validation or a request is created for this.

  // If all goes well, this will be saved
  const response = new UserModel({
    username,
    email,
    password: CryptoJS.AES.encrypt(password, process.env.CRYPTO_PASSWORD_SECRET).toString(),
    isAdmin: true // test
  });

  try{
    const user = await response.save();
    const payload = {
      id: user._id,
      isAdmin: user.isAdmin,
    }
    const getToken = createAndGetToken(payload, '1h');
    const getRefreshToken = createAndGetRefreshToken(payload, '7d');
    res.status(200).json({
      success: true,
      data: {
        token: getToken,
        refreshToken: getRefreshToken
      }
    });
  }catch(err){
    res.status(500).json({
      success: false,
      error: 'Existing credentials, Please try again!',
    });
  }
}

const refreshToken = async (req, res) => {
  try{
    const { id, isAdmin } = req.user;

    const payload = {
      id,
      isAdmin
    }

    const getToken = createAndGetToken(payload, '1h');
    const getRefreshToken = createAndGetRefreshToken(payload, '7d');

    res.status(200).json({
      success: true, 
      data: {
        token: getToken,
        refreshToken: getRefreshToken
      }
    });
  }catch(err){
    res.status(500).json(err);
  }

}

const logout = (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Successfully logged out'
  })
}

module.exports = {
  register,
  login,
  refreshToken,
  logout
}
