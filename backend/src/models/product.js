const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: String,
    email: String,
    passwd: String,
    question: String,
    answer: String,
});

module.exports = mongoose.model('Product', ProductSchema);

