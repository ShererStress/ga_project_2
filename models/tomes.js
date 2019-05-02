const mongoose = require(`mongoose`);

const tomeSchema = new mongoose.Schema( {
  name: {type: String, required: true},
  jsText: String,
});

//Collections name: blocks
const Tome = mongoose.model(`Block`, tomeSchema);

module.exports = Tome;
