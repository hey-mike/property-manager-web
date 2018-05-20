const mongoose = require('mongoose');

//Define BookSchema with title, description and category
const BookSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    category: {
        type: String,
        required: true,
        enum: ['High', 'Medium', 'Low']
    }
});

module.exports = mongoose.model('book', BookSchema );

