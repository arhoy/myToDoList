
var mongoose = require('mongoose');
mongoose.set('debug', true);
// connect to database server
mongoose.connect('mongodb://localhost/');

// allows as to chain on .find().then() more easily?! 
mongoose.Promise = Promise;

// This is what we are going to import (i.e require) in our main index.js file
module.exports.Todo = require("./todo");