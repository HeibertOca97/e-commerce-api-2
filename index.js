const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const port = 5000;
const userRoute = require('./routes/user.router')

// CONFIGURATION
require('dotenv').config();
app.use(morgan('combined'));
async function connection(){
  try{
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connection mongodb ACTIVE');
  }catch(err){
    console.error(err);
  }
}


// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ROUTER
app.use('/api/v1', userRoute);

// STARTING CONNECTION MONGODB_URI
connection();


// STARTING SERVER
app.listen(process.env.PORT || port, () => {
  console.log(`Server listening on port ${port}`);
});
