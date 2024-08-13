const JWT = require('jsonwebtoken')

const generateJWT = (id) => {
    const token = JWT.sign({id}, process.env.JWT_SECRET, {expiresIn: '30d'}) 
    return token;
}

module.exports = generateJWT;
