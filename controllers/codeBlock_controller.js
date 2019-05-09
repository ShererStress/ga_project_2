const express = require(`express`);
const router = express.Router();

const Tome = require('../models/tomes.js');

let inputArgumentsGlobal = [];


//SHOW(get) - index
router.get(`/`, function(req,res) {
  Tome.find({}, function(err, allTomes) {
    res.render(`index.ejs`, {
      allTomesKey: allTomes,
    });
  });
});

//SHOW(get) - new tome form
router.get(`/new`, function(req,res) {
  res.render(`new.ejs`);
});

//CREATE(post) - create new tome -> Show single tome
router.post(`/`, function(req,res) {
  console.log(req.body);
  Tome.create(req.body, function(err, tomeData) {
    res.redirect(`/codeBlock/`);
  });
});

//EDIT(get) - edit/delete single tome
router.get(`/:id/edit`, function(req,res) {
  Tome.findById(req.params.id, function(err, tomeData) {
    res.render(`edit.ejs`, {
      tomeDataKey: tomeData,
    });
  });
});

//SHOW - iframe
router.get(`/testFrame/:id`, function(req,res) {
  Tome.findById(req.params.id, function(err, tomeData) {
    res.render(`testIframe.ejs`, {
      tomeDataKey: tomeData,
      argumentsInKey: inputArgumentsGlobal
    });
  });
});

//SHOW(get) - single tome
router.get(`/:id`, function(req,res) {
  Tome.findById(req.params.id, function(err, tomeData) {
    res.render(`show.ejs`, {
      tomeDataKey: tomeData,
    });
  });
});

//UPDATE(put) - update single tome, -> show single tome
router.put(`/:id`, function(req,res) {
  let paramNumber = 0;
  req.body.parameters = [];
  while(req.body[`par${paramNumber}`] !== undefined) {
    req.body.parameters.push(req.body[`par${paramNumber}`]);
    paramNumber++;
  }
  Tome.findByIdAndUpdate(req.params.id, req.body, {new:true}, function(err, editedLog) {
    res.redirect(`/codeBlock/${req.params.id}`);
  });
});

//DESTROY(delete) - delete single tome -> index
router.delete(`/:id`, function(req,res) {
  Tome.findByIdAndDelete(req.params.id, function(err, removedTome) {
    res.redirect(`/codeBlock`);
  });
});

//RUN(get) - runs the input function
router.post(`/:id/run`, function(req,res) {
  let paramNumber = 0;
  let parametersIn = [];
  while(req.body[`parIn${paramNumber}`] !== undefined) {
    let argumentValue = req.body[`parIn${paramNumber}`];
    parametersIn.push(argumentValue);
    paramNumber++;
  }
  inputArgumentsGlobal = parametersIn;
  Tome.findById(req.params.id, function(err, tomeData) {
    res.render(`run.ejs`, {
      tomeDataKey: tomeData
    }, function(err, html) {
      if(err) {
        console.log(err);
        res.send(`The code encountered an error!`);
      } else {
        res.send(html);
      }
    });
  });
});

module.exports = router;
