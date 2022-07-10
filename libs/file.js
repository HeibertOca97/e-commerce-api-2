const path = require('path');
const fs = require('fs');

const getPublicImagePath = (filename) => {
  return `${process.env.PUBLIC_IMAGE_PATH}/${filename}`;
}

const getImageDirectoryPath = (privateImagePath) => {
  const filename = privateImagePath.split('/').pop();  
  const originalPath = path.join(__dirname, `..${process.env.IMAGE_DIRECTORY_PATH}/${filename}`)
  return originalPath;
}

const removeImageFromDirectory = (originalDirectoryPath) => {
  if(fs.existsSync(originalDirectoryPath)){
    fs.unlinkSync(originalDirectoryPath);
  } 
}

module.exports = {
  getPublicImagePath,
  getImageDirectoryPath,
  removeImageFromDirectory
}
