// Description: Middleware functions to verify the user's role and authentication status


// Middleware function to check if the user is an administrator
const isAdmin = async (req, res, next) => {
    const user = req.decoded;
    if (user && user.role === 'admin') {
        // User is an admin, allow access to the route
        return next();
    } else {
        // User is not an admin, deny access
        
        return res.status(403).json({ message: 'Access denied. You are not an administrator.' });
    }
};

// Middleware function to check if the user is authenticated
const isAuthenticated = async (req, res, next) => {
    if (req.user) {
        // User is authenticated, allow access to the route
        return next();
    } else {
        // User is not authenticated, deny access
        return res.status(401).json({ message: 'Authentication required.' });
    }
};


module.exports = {
    isAdmin,
    isAuthenticated
}