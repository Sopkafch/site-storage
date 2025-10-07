const jwt = require('jsonwebtoken')

module.exports = function(req, res, next){
    if (req.method === 'OPTIONS') return next();

    try {  
        if (!req.cookies.jwt) {
            return res.status(401).json({ message: 'Пользователь не авторизован' });
        }

        const token = req.cookies.jwt;
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        
        req.user = decoded;
        next();
    } catch (e) {
        return res.status(500).json({ message: e });
    }
}