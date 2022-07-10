const multer = require('multer');


const productImageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/images')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random())
    cb(null, `${uniqueSuffix}-${file.originalname}`)
  }
});

const uploadProductImage = multer({ storage: productImageStorage });

module.exports = {
  uploadProductImage: uploadProductImage.single('image'),
}
