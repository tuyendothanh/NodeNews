// Load required packages
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Article = require('./models/article');
var Category = require('./models/category');

// Connect to the beerlocker MongoDB
mongoose.connect('mongodb://localhost:27017/articlecontainer');

// Create our Express application
var app = express();

// Use the body-parser package in our application
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Use environment defined port or 3000
var port = process.env.PORT || 3000;

// Create our Express router
var router = express.Router();

// Initial dummy route for testing
// http://localhost:3000/api
router.get('/', function(req, res) {
  res.json({ message: 'You are running dangerously low on article!' });
});

// ----------------------------------------------------------------------
// Categories Start
// ----------------------------------------------------------------------
// Create a new route with the prefix /categories
var CategoriesRoute = router.route('/categories');

// Create endpoint /api/categories for POSTS
CategoriesRoute.post(function(req, res) {
  // Create a new instance of the Category model
  var category = new Category();

  // Set the article properties that came from the POST data
  category.category = req.body.category;
  category.image = req.body.image;

  // Save the article and check for errors
  category.save(function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Category added to the locker!', data: category });
  });
});

// Create endpoint /api/categories for GET
CategoriesRoute.get(function(req, res) {
  // Use the Category model to find all article
  Category.find(function(err, categories) {
    if (err)
      res.send(err);

    res.json(categories);
  });
});

// Create a new route with the /articles/:article_id prefix
var articlesByCategoryRoute = router.route('/categories/:category_id');

// Create endpoint /api/articles/:article_id for GET
articlesByCategoryRoute.get(function(req, res) {
  // Use the Article model to find a specific article
  Article.find({category:req.params.category_id}, function(err, articles) {
    if (err)
      res.send(err);
    console.log(articles);
    res.json(articles);
  });
});

// Create endpoint /api/categories/:category_id for PUT
articlesByCategoryRoute.put(function(req, res) {
  // Use the Article model to find a specific article
  Category.find({category:req.params.category_id}, function(err, category) {
    if (err)
      res.send(err);

    // Update the existing category content
    category.image = req.body.image;

    // Save the category and check for errors
    category.save(function(err) {
      if (err)
        res.send(err);

      res.json(category);
    });
  });
});

// Create endpoint /api/articles/:article_id for DELETE
articlesByCategoryRoute.delete(function(req, res) {
  // Use the Article model to find a specific article and remove it
  Category.findByIdAndRemove(req.params.category_id, function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Category removed from the Categories!' });
  });
});
// ------------------------------Categories End--------------------------


// Create a new route with the prefix /articles
var articlesRoute = router.route('/articles');

// Create endpoint /api/articles for POSTS
articlesRoute.post(function(req, res) {
  // Create a new instance of the Article model
  var article = new Article();

  // Set the article properties that came from the POST data
  article.title = req.body.title;
  article.content = req.body.content;
  article.author = req.body.author;
  article.category = req.body.category;

  // Save the article and check for errors
  article.save(function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Article added to the locker!', data: article });
  });
});

// Create endpoint /api/articles for GET
articlesRoute.get(function(req, res) {
  // Use the Article model to find all article
  Article.find(function(err, articles) {
    if (err)
      res.send(err);

    res.json(articles);
  });
});

// Create a new route with the /articles/:article_id prefix
var articleRoute = router.route('/articles/:article_id');

// Create endpoint /api/articles/:article_id for GET
articleRoute.get(function(req, res) {
  // Use the Article model to find a specific article
  Article.findById(req.params.article_id, function(err, article) {
    if (err)
      res.send(err);

    res.json(article);
  });
});

// Create endpoint /api/articles/:article_id for PUT
articleRoute.put(function(req, res) {
  // Use the Article model to find a specific article
  Article.findById(req.params.article_id, function(err, article) {
    if (err)
      res.send(err);

    // Update the existing article content
    article.content = req.body.content;

    // Save the article and check for errors
    article.save(function(err) {
      if (err)
        res.send(err);

      res.json(article);
    });
  });
});

// Create endpoint /api/articles/:article_id for DELETE
articleRoute.delete(function(req, res) {
  // Use the Article model to find a specific article and remove it
  Article.findByIdAndRemove(req.params.article_id, function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Article removed from the locker!' });
  });
});

// Register all our routes with /api
app.use('/api', router);

// Start the server
app.listen(port);
console.log('Insert article on port ' + port);
