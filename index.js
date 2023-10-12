// Description: This file is the entry point for the application.
require('dotenv').config();
const express= require('express');
const mongoose = require('mongoose');
const logger = require('./tools/logger');
const PORT = process.env.PORT || 5000;


mongoose.connect(process.env.MONGODB_URI);

const app = express();

mongoose.connection.on('connected', () => {
    logger.log('info', `Connection to MongoDB Established `);
});


require('./models/user');
require('./models/book');

const userRouter = require('./routes/user');
const bookRouter = require('./routes/book');



app.use(express.json());

app.use('/user', userRouter);
app.use('/book', bookRouter);



app.listen(PORT, '0.0.0.0', () => {
    logger.log('info', `Server is running on port ${PORT} satrted!`);
    console.log(`Server is running on port ${PORT} satrted!`);
});