const express = require(`express`);
const router = express.Router();

const Tome = require('../models/tomes.js');


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

//CREATE(post) - create new product -> Show single block
router.post(`/`, function(req,res) {
  Tome.create(req.body, function(err, tomeData) {
    res.redirect(`/codeBlock/`);
  });
});

//EDIT(get) - edit/delete single product
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
    });
  });
});



//SHOW(get) - single products
router.get(`/:id`, function(req,res) {
  Tome.findById(req.params.id, function(err, tomeData) {
    res.render(`show.ejs`, {
      tomeDataKey: tomeData,
    });
  });
});

//UPDATE(put) - update single product, -> show single product
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

//DESTROY(delete) - delete single product -> index
router.delete(`/:id`, function(req,res) {
  Tome.findByIdAndDelete(req.params.id, function(err, removedTome) {
    res.redirect(`/codeBlock`);
  });
});

//RUN(get) - runs the input function
router.get(`/:id/run`, function(req,res) {
  console.log("here we go");
  Tome.findById(req.params.id, function(err, tomeData) {
    res.render(`run.ejs`, {
      tomeDataKey: tomeData,
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
