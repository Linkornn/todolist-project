const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
  text: String,
  time: String,
  date: String
});

const List = mongoose.model('List', listSchema);

module.exports = List;