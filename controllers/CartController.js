const CartModel = require('../models/Cart')

// @SAVE DATA
const store = async (req, res) => {
  const response = new CartModel(req.body);
  try {
    const savedCart = await response.save();

    res.status(200).json({
      success: true,
      message: "Cart created successfully",
      data: savedCart
    });
  }catch(err) {
    res.status(500).json(err);
  }
}

// @UPDATE DATA
const update = async (req, res) => {
  try {
    const updatedCart = await CartModel.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, {
      new: true
    });

    res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      data: updatedCart
    });
  }catch(err) {
    res.status(500).json(err);
  }
}

// @DELETE DATA
const destroy = async (req, res) => {
  try {
    await CartModel.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Cart has been delete...'
    });
  }catch(err){
    res.status(500).json(err);
  }
}

// @SHOW USER CART
const showUserCart = async (req, res) => {
  try {
    const cart = await CartModel.findOne({ userId: req.params.userId });

    res.status(200).json({
      success: true,
      data: cart
    })
  }catch(err) {
    res.status(500).json(err);
  }
} 

// @GET ALL CARTS
const index = async (req, res) => {
  try{
    const carts = await CartModel.find();

    res.status(200).json({
      status: true,
      data: carts
    });
  }catch(err){
    res.status(500).json(err);
  }
}

module.exports = {
  store,
  update,
  destroy,
  showUserCart,
  index
}
