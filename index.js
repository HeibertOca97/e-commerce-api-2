const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors')
const mongoose = require('mongoose');
const port = 5000;
//const authRoute = require('./routes/auth.router');
//const userRoute = require('./routes/user.router')

// CONFIGURATION
require('dotenv').config();
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ROUTER
app.use('/api/v1/auth', require('./routes/auth.router'));
app.use('/api/v1/users', require('./routes/user.router'));
app.use('/api/v1/products', require('./routes/product.router'));

// STARTING CONNECTION MONGODB_URI
async function connection(){
  try{
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Successfully connected to MongoDB.');
  }catch(err){
    console.error(err);
  }
}
connection();
// STARTING SERVER
app.listen(process.env.PORT || port, () => {
  console.log(`Server listening on port ${port}`);
});
