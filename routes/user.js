const express = require('express');
const bcrypt = require('bcrypt');
const { default: mongoose } = require('mongoose');
const { getToken, checkToken } = require('../middlewares/jwt');
const asyncErrorHandler = require('../tools/asyncErrorHandler');
const logger = require('../tools/logger');
const router = express.Router();
const UserModel = mongoose.model('User');


// - `POST /`: Crée un nouveau utilizateur.
router.post('/register', asyncErrorHandler(async (req, res) => {
    const { username, password, role } = req.body;

    let hashPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
        username,
        password: hashPassword,
        role
    });

    if (user) {
        logger.info(`201 - User ${username} created by ${req.ip}`);
        res.json(user);
    } else {
        logger.error(`500 - User ${username} not created by ${req.ip}`);
        res.json('error');
    }
})); 

// - `POST /`: Crée un nouveau utilizateur.
router.post('/register', asyncErrorHandler(async (req, res) => {
    const { username, password, role } = req.body;

    let hashPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
        username,
        password: hashPassword,
        role
    });

    if (user) {
        logger.info(`201 - User ${username} created by ${req.ip}`);
        res.json(user);
    } else {
        logger.error(`500 - User ${username} not created by ${req.ip}`);
        res.json('error');
    }
}));

// - `POST /login`: Connecte un utilisateur.
router.post('/login', asyncErrorHandler(async (req, res) => {
    const { username, password } = req.body;

    const user = await UserModel.findOne({ username });
    if (!user) {
        logger.warn(`401 - User ${username} not found by ${req.ip}`);
        res.status(401).json('Username or Password does not match')
    } else {
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            logger.warn(`401 - User ${user.username} tried to connect with wrong password!`);
            res.status(401).json('Username or Password does not match');
        } else {
            const token = getToken(user);
            res.json({
                token
            });
        }
    }
}));

// - `GET /me`: Récupère l'utilisateur courant.
router.get('/me', checkToken, asyncErrorHandler(async (req, res) => {
    if(req.decoded) {
        const user = await UserModel.findById(req.decoded._id);
        logger.info(`User ${user.username} connected at ${new Date().toLocaleString()}`);
        res.json(user); 
    } else {
        logger.error(`404 - User ${id} not found by ${req.ip}`);
        return res.status(404).json({ message: 'User not found' });
    }
}));


module.exports = router;