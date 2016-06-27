// Load required packages
var mongoose = require('mongoose');

// Define our beer schema
var CategorySchema   = new mongoose.Schema({
  category: String,
  image:String
});

// Export the Mongoose model
module.exports = mongoose.model('Category', CategorySchema);
