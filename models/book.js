/*Book Model*/

const mongoose = require('mongoose');

const {Schema} = mongoose;

const bookSchema = new Schema({

    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true

    },
    pages: {
        type: Number,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    published: {
        type: String,
        required: true
    },
    userId: { 
        type: Schema.Types.ObjectId, 
        ref: 'User' 
    }
});

module.exports = mongoose.model('Book', bookSchema);