const mongoose = require(`mongoose`);

const tomeSchema = new mongoose.Schema( {
  title: {type: String, required: true},
  fName: String,
  parameters: [String],
  jsText: String,
});

//Collections name: blocks
const Tome = mongoose.model(`Block`, tomeSchema);

module.exports = Tome;
