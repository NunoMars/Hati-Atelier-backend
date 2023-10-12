//Book routes

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Book = mongoose.model('Book');
const User = mongoose.model('User');
const asyncErrorHandler = require('../tools/asyncErrorHandler');
const logger = require('../tools/logger');
const { checkToken } = require('../middlewares/jwt');

const { isAdmin, isAuthenticated } = require('../middlewares/roles'); 

router.use(checkToken);
//Get all books

router.get('/', isAuthenticated, asyncErrorHandler(async (req, res) => {
    const books = await Book.find();

    res.send(books);
}));

//Get a book by id

router.get('/:id', isAuthenticated, asyncErrorHandler(async (req, res) => {
    const book = await Book.findById(req.params.id);
    res.send(book);
}));

//Create a book

router.post('/', isAdmin, asyncErrorHandler(async (req, res) => {


    const {title, author, pages, genre, published} = req.body;
    const book = new Book({
        title,
        author,
        pages,
        genre,
        published
    });
    await book.save();
    res.send(book);
}));

//Update a book

router.put('/:id', isAdmin, asyncErrorHandler(async (req, res) => {
    const { title, author, pages, genre, published } = req.body;
    const book = await Book.findByIdAndUpdate(req.params.id);    
    book.title = title;
    book.author = author;
    book.pages = pages;
    book.genre = genre;
    book.published = published;
    await book.save();
    res.send(book);
}));

//Delete a book

router.delete('/:id', isAdmin, asyncErrorHandler(async (req, res) => {
    const book = await Book.findByIdAndDelete(req.params.id);
    res.send(book);
}));

module.exports = router;
