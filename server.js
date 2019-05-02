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

//Prevents a few depreciation warnings
mongoose.set("useFindAndModify", false);


//Contoller declarations


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

app.get(`/`, function(req,res) {
  res.send(`The server is running`);
});
