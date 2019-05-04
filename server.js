//Server setup
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
//const session = require("express-session");

//Environment variables
require(`dotenv`).config();
const PORT = process.env.PORT;
//const PORT = 3000;
const mongoURI = process.env.MONGODB_URI;
//const mongoURI = `mongodb://localhost:27017/code_storage`;


//Mongo setup
mongoose.connect(mongoURI, { useNewUrlParser: true });
mongoose.connection.once("open", ()=> {
  console.log(`!\n connected to mongo \n!`);
});

const Tome = require('./models/tomes.js');

//Prevents a few depreciation warnings
mongoose.set("useFindAndModify", false);


//Contoller routes


//Start the server
app.listen(PORT, function() {
  console.log(`Server active - port ${PORT}`);
});


// Global Middleware
// allows us to use put and delete methods
app.use(methodOverride("_method"));
// parses info from our input fields into an object
app.use(express.urlencoded({ extended: false }));
// app.use(session{}) goes here


//Controller routes


//Server routes

//SHOW(get) - index
app.get(`/`, function(req,res) {
  Tome.find({}, function(err, allTomes) {
    res.render(`index.ejs`, {
      allTomesKey: allTomes,
    });
  });
});


//SHOW(get) - new tome form
app.get(`/new`, function(req,res) {
  res.render(`new.ejs`);
});

//CREATE(post) - create new product -> Show single block
app.post(`/`, function(req,res) {
  Tome.create(req.body, function(err, tomeData) {
    res.redirect(`/`);
  });
});

//EDIT(get) - edit/delete single product
app.get(`/:id/edit`, function(req,res) {
  Tome.findById(req.params.id, function(err, tomeData) {
    res.render(`edit.ejs`, {
      tomeDataKey: tomeData,
    });
  });
});


//SHOW(get) - single products
app.get(`/:id`, function(req,res) {
  Tome.findById(req.params.id, function(err, tomeData) {
    res.render(`show.ejs`, {
      tomeDataKey: tomeData,
    });
  });
});

//UPDATE(put) - update single product, -> show single product
app.put(`/:id`, function(req,res) {
  Tome.findByIdAndUpdate(req.params.id, req.body, {new:true}, function(err, editedLog) {
    res.redirect(`/${req.params.id}`);
  });
});

//DESTROY(delete) - delete single product -> index
app.delete(`/:id`, function(req,res) {
  Tome.findByIdAndDelete(req.params.id, function(err, removedTome) {
    res.redirect(`/`);
  });
});

app.get(`/:id/run`, function(req,res) {
  Tome.findById(req.params.id, function(err, tomeData) {
    res.render(`run.ejs`, {
      tomeDataKey: tomeData,
    });
  });
});
