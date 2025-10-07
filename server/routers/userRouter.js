const Router = require('express')
const router = new Router()
const bcrypt = require('bcrypt')
const jwttoken = require('jsonwebtoken')


const {User} = require('../models/models')
const ApiError = require('../error/ApiError')

router.post('/login', async(req, res, next) => {
    const {email, password} = req.body
    const user = await User.findOne({where: {email}})
    if(!user) {
        return next(ApiError.err(401, 'Неверный email')) ////////
    }
    let comparePassword = bcrypt.compareSync(password, user.password)
    if(!comparePassword) {
        return next(ApiError.err(401, 'Неверный password')) ////////////
    }
    const token = jwttoken.sign({id: user.id, email: user.email, role: user.role}, process.env.SECRET_KEY, {expiresIn: '48h'})
    
    res.cookie('jwt', token, { // добовляет заголовок к основному запросу 
    httpOnly: true,           //  нельзя читать из JS — безопасно
    secure: false,            // в проде: true (если HTTPS)
    sameSite: 'Lax',          // или 'None' + secure, если кроссдомен
    maxAge: 1000 * 60 * 60 * 48,   // 1 час ||  1000 * 60 * 60 * 24,
  })
  .json({ message: 'Успешный вход' }); 
})

router.get('/auth', async(req, res, next) => {
    if (!req.cookies.jwt) {
        return next(ApiError.err(401, 'Пользователь не авторизован'))
    }

    const token = req.cookies.jwt
    const decode = jwttoken.verify(token, process.env.SECRET_KEY)

    res.json({decode})
})

router.post('/logout', async(req, res) => {
    res.clearCookie('jwt'); // он не отпровляет! он только добовляет заголовок а вот res.json уже отпрвляет
    res.json({ message: 'Вы вышли' }); // Надо обязательно что то отпровлять 
})

module.exports = router