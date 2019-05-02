//Server setup
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
//const session = require("express-session");

//Environment variables
//require(`dotenv`).config();
// const PORT = process.env.PORT;
const port = 3000;
// const mongoURI = process.env.MONGODB_URI;
const mongoURI = `mongodb://localhost:27017/code_storage`;

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

app.listen(port, function() {
  console.log(`Server active - port ${port}`);
});


// Global Middleware
// allows us to use put and delete methods
app.use(methodOverride("_method"));
// parses info from our input fields into an object
app.use(express.urlencoded({ extended: false }));
// app.use(session{}) goes methodOverride


//Controller routes


//Server routes

//SHOW(get) - index
app.get(`/`, function(req,res) {
  Tome.find({}, function(err, allTomes) {
    console.log(allTomes);
    res.send(`The server is running - tome index page`);
  });
});


//SHOW(get) - new tome form
app.get(`/new`, function(req,res) {
  res.send(`New tome form (new.ejs)`);
});

//CREATE(post) - create new product -> Show single block
app.post(`/`, function(req,res) {
  console.log(`New tome added (not really)`);
  res.redirect(`/`);
});

//SHOW(get) - single products
app.get(`/:id`, function(req,res) {
  res.send(`Show single tome ${req.params.id} (show.ejs)`);
});

//EDIT(get) - edit/delete single product
app.get(`/:id/edit`, function(req,res) {
  res.send(`Edit/delete tome form (edit.ejs)`);
});

//UPDATE(put) - update single product, -> show single product
app.put(`/:id`, function(req,res) {
  console.log(`Tome edited (not really)`);
  res.redirect(`/${req.params.id}`);
});

//DESTROY(delete) - delete single product -> index
app.delete(`/:id`, function(req,res) {
  console.log(`Tome deleted (not really)`);
  res.send(`/${req.params.id}`);
});
