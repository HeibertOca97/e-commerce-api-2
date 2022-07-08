const ProductModel = require('../models/Product')

const getAll = async (req, res) => {
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

const findProduct = async (req, res) => {
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

const addProduct = async (req, res) => {
  const response = new ProductModel(req.body);
  try {
    const saveProduct = await response.save();

    res.status(200).json({
      success: true,
      message: "Product created successfully",
      data: saveProduct
    });
  }catch(err) {
    res.status(500).json(err);
  }
}

const updateProduct = async (req, res) => {
  try {
    const updateProduct = await ProductModel.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, {
      new: true
    });

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updateProduct
    });
  }catch(err) {
    res.status(500).json(err);
  }
}

const deleteProduct = async (req, res) => {
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

module.exports = {
  getAll,
  addProduct,
  updateProduct,
  deleteProduct,
  findProduct
}
