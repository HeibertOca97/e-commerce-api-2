const ProductModel = require('../models/Product')

// @SAVE DATA
const store = async (req, res) => {
  const response = new ProductModel(req.body);
  try {
    const savedProduct = await response.save();

    res.status(200).json({
      success: true,
      message: "Product created successfully",
      data: savedProduct
    });
  }catch(err) {
    res.status(500).json(err);
  }
}

// @UPDATE DATA
const update = async (req, res) => {
  try {
    const updatedProduct = await ProductModel.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, {
      new: true
    });

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct
    });
  }catch(err) {
    res.status(500).json(err);
  }
}

// @DELETE DATA
const destroy = async (req, res) => {
  try {
    await ProductModel.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Product has been delete...'
    });
  }catch(err){
    res.status(500).json(err);
  }
}

// @GET ALL DATA
const index = async (req, res) => {
  /***
   * Route query example
   * /products?new=true
   * /products?category=name_category
  ***/
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;

    if(qNew){
      products = await ProductModel.find().sort({ createdAt: -1 }).limit(5);
    }else if(qCategory){
      products = await ProductModel.find({ 
        categories: {
          $in: [qCategory]
        }
      });
    }else{
      products = await ProductModel.find();
    }

    res.status(200).json({
      success: true,
      data: products
    })
  }catch(err) {
    res.status(500).json(err);
  }

}

// @SHOW DATA
const show = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);

    res.status(200).json({
      success: true,
      data: product
    })
  }catch(err) {
    res.status(500).json(err);
  }
}


module.exports = {
  index,
  store,
  update,
  destroy,
  show
}
