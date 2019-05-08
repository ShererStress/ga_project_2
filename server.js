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
//Prevents a few depreciation warnings
mongoose.set("useFindAndModify", false);

mongoose.connection.once("open", ()=> {
  console.log(`!\n connected to mongo \n!`);
});

const Tome = require('./models/tomes.js');

//Contollers
const blockController = require(`./controllers/codeBlock_controller.js`);

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
app.use(express.static('public'));

//Controller routes

app.use(`/codeBlock`, blockController);


//Server routes
