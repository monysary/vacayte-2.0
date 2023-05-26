const jwt = require('jsonwebtoken')

module.exports = {
    signToken: ({ _id, username, email, password }) => {
        const payload = { _id, username, email, password }
        return jwt.sign(payload, process.env.SECRET, {
            expiresIn: process.env.EXPIRE,
        })
    },
    authMiddleware: (req, res, next) => {
        const token = req.headers.authorization

        if (!token) {
            return res.status(401).json({ message: 'Missing authorization token' })
        }

        try {
            const decodedToken = jwt.verify(token, process.env.SECRET)
            req.user = decodedToken
            next()
        } catch (error) {
            return res.status(403).json({ message: 'Invalid token' })
        }
    },
}
