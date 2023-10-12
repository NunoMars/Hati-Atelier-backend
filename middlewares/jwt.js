// Description: JWT middleware to create and check tokens

const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || "AHoleNewWorldFullOfMagicAndWonderAndAssHoles";
const expiry = process.env.JWT_EXPIRY || "7d";

//Creates a token
let getToken = (user) => {
    return jwt.sign({
        _id: user._id,
        username: user.username,
        role:user.role
    }, secret, {
        expiresIn: expiry
    });
}

//Cheks if the token is valid
let checkToken = (req, res, next) => {
    let token = req.headers.authorization; // "Bearer monToken"

    if (token) {
        token = token.replace("Bearer ", "") // "monToken"

        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                return next(new Error("Invalid token"));
            }

            req.decoded = decoded;
            next();
        });
    } else {
        res.status(403).json({
            message: "No token provided"
        });
    }
}

module.exports = {
    getToken,
    checkToken
}