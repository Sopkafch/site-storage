const jwt = require('jsonwebtoken')

module.exports = function(role){
    return function pop(req, res, next){
        if (req.method === 'OPTIONS') return next();
        try {
            if (!req.cookies.jwt) {
                return res.status(401).json({ message: 'Пользователь не авторизован' });
            }

            const token = req.cookies.jwt
            const decode = jwt.verify(token, process.env.SECRET_KEY);

            if(decode.role !== role){
                return res.status(403).json({mesage: "Нет доступа"})
            }

            req.user = decode
            next()
        } catch (e) {
            return res.status(500).json({ message: e });
        }
    }
}
