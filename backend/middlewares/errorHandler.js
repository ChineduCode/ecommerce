module.exports = (err, req, res, next) => {
    // Network Errors
    if (err.code === 'ENOTFOUND' || err.code === 'ECONNREFUSED') {
        console.error('Service unavailable. Please check your internet connection.')
        return res.status(503).json({ message: 'Service unavailable. Please check your internet connection.' });
    }

    // Database Errors
    if (err.name === 'MongoNetworkError' || err.name === 'MongooseError') {
        console.error('Database error. Please try again later.')
        return res.status(500).json({ message: 'Database error. Please try again later.' });
    }

    if (err.name === 'MongoServerSelectionError') {
        console.error('Unable to connect to the database. Please check your MongoDB URI or network connection.')
        return res.status(503).json({ message: 'Unable to connect to the database. Please check your MongoDB URI or network connection.' });
    }

    if (err.name === 'ValidationError') {
        console.error('Validation error.', err.errors)
        return res.status(400).json({ message: 'Validation error.', details: err.errors });
    }

    // Authentication & Authorization Errors
    if (err.name === 'UnauthorizedError') {
        console.error('Invalid token. Please log in again.')
        return res.status(401).json({ message: 'Invalid token. Please log in again.' });
    } 
    
    if (err.name === 'ForbiddenError') {
        console.error('You do not have permission to access this resource.')
        return res.status(403).json({ message: 'You do not have permission to access this resource.' });
    }

    // Syntax & Parsing Errors
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        console.error('Bad request. Invalid JSON.')
        return res.status(400).json({ message: 'Bad request. Invalid JSON.' });
    }

    // File Upload Errors
    if (err.code === 'LIMIT_FILE_SIZE') {
        console.error('File too large. Maximum size allowed is 2MB.')
        return res.status(413).json({ message: 'File too large. Maximum size allowed is 2MB.' });
    }

    if (err.code === 'INVALID_FILE_TYPE') {
        console.error('Invalid file type. Only images are allowed.')
        return res.status(422).json({ message: 'Invalid file type. Only images are allowed.' });
    }

    // General Errors
    console.error(err.stack);
    return res.status(500).json({ message: 'Something went wrong. Please try again later.' });
};
