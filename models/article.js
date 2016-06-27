// Load required packages
var mongoose = require('mongoose');

// Define our beer schema
var ArticleSchema   = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  category: String
});

// Export the Mongoose model
module.exports = mongoose.model('Article', ArticleSchema);
