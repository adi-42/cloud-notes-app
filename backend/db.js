const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/bookdb";
  
const connectToMongo = ()=>{
    mongoose.connect(mongoURI);
    console.log('MongoDB connected on port 27017')
}

module.exports = connectToMongo;