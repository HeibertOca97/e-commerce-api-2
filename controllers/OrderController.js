const OrderModel = require('../models/Order');

// @SAVE DATA
const store = async (req, res) => {
  const response = new OrderModel(req.body);
  try {
    const savedOrder = await response.save();

    res.status(200).json({
      success: true,
      message: "Order created successfully",
      data: savedOrder
    });
  }catch(err) {
    res.status(500).json(err);
  }
}

// @UPDATE DATA
const update = async (req, res) => {
  try {
    const updatedOrder = await OrderModel.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, {
      new: true
    });

    res.status(200).json({
      success: true,
      message: "Order updated successfully",
      data: updatedOrder
    });
  }catch(err) {
    res.status(500).json(err);
  }
}

// @DELETE DATA
const destroy = async (req, res) => {
  try {
    await OrderModel.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Order has been delete...'
    });
  }catch(err){
    res.status(500).json(err);
  }
}

// @SHOW USER ORDER
const showUserOrder = async (req, res) => {
  try {
    const order = await OrderModel.findOne({ userId: req.params.userId });

    res.status(200).json({
      success: true,
      data: order
    })
  }catch(err) {
    res.status(500).json(err);
  }
} 

// @GET ALL DATA
const index = async (req, res) => {
  try{
    const orders = await OrderModel.find();

    res.status(200).json({
      status: true,
      data: orders
    });
  }catch(err){
    res.status(500).json(err);
  }
}

// @GET MONTHLY INCOME
const showMonthlyIncome = async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try{
    const income = await OrderModel.aggregate([
      { 
        $match: {
          createdAt: {
            $gte: previousMonth 
          }
        }
      },
      {
        $project: {
          month: {
            $month: "$createdAt"
          },
          sales: "$amount"
        },
      },
      {
        $group: {
          _id: "$month",
          total: {
            $sum: "$sales"
          }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: income
    })
  }catch(err){
    res.status(500).json(err);
  }
}

module.exports = {
  store,
  update,
  destroy,
  showUserOrder,
  index,
  showMonthlyIncome
}
