const UserModel = require('../models/User')
const CryptoJS = require('crypto-js');


// @UPDATE DATA
const update = async(req, res) => { 
  // Here going the validation or a request is created for this.

  if(req.body.password){
    req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.CRYPTO_PASSWORD_SECRET).toString();
  }

  try{
    const user = await UserModel.findByIdAndUpdate(req.params.id, {
      $set: req.body
    },{
      new: true
    });

    res.status(200).json({
      success: true,
      data: user
    });

  }catch(err) {
    res.status(500).json(err);
  }
}

// @DELETE DATA
const destroy = async (req, res) => {
  try {
    await UserModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "User has been deleted..."
    })
  }catch(err) {
    res.status(500).json(err);
  }
}

// @SHOW DATA
const show = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    const {password, ...otherProperty} = user._doc;

    res.status(200).json({
      success: true,
      data: otherProperty
    })
  }catch(err) {
    res.status(500).json(err);
  }
}

// @GET DATA
const index = async(req, res) => {
  const query = req.query.new;
  try{
    const users = query 
      ? await UserModel.find().sort({_id: -1}).limit(5) 
      : await UserModel.find();

    let newuserlists = users.map(user => {
      const {password, ...newuser} = user._doc;
      return newuser;
    })
    return res.status(200).json({
      data: newuserlists,
      success: true,
    })
  }catch(err){
    return res.status(401).json(err)
  }
}

// @GET ALL STATS
const getStats = async(req, res) => {
  // will show how many users are registered per month. 
  let date = new Date();
  let lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  try{
    const data = await UserModel.aggregate([
      {
        $match: { 
          createdAt: { 
            $gte: lastYear 
          } 
        }
      },
      {
        $project: {
          month: {
            $month: "$createdAt"
          }
        }
      },
      {
        $group: {
          _id: "$month",
          total: {
            $sum: 1
          },
        }
      },
    ]);

    res.status(200).json({
      success: true,
      data
    });
  }catch(err){
    res.status(500).json(err);
  }
}

module.exports = {
  index,
  update,
  destroy,
  show,
  getStats,
};
