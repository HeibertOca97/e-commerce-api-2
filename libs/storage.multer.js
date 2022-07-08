const multer = require('multer');

const productImageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './storage/images')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random())
    cb(null, `${file.fieldname}-${uniqueSuffix}`)
  }
});

const uploadProductImage = multer({ storage: productImageStorage });

module.exports = [
  uploadProductImage
]
