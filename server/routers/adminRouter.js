const { v4: uuidv4 } = require('uuid'); // для имени
const path = require('path')
const Router = require('express')
const router = new Router()
const bcrypt = require('bcrypt')
const jwttoken = require('jsonwebtoken')
const fs = require('fs/promises')
const ApiError = require('../error/ApiError')

const {Document} = require('../models/models')
const {User} = require('../models/models');

router.post('/FileUpload', async(req, res, next) => {
    try{
       if(!req.files){
            return next(ApiError.err(400, 'Файл не обноружен'))
        }
        
        const {file} = req.files
        const fileCopy = uuidv4();
        const storageName = `${fileCopy}${path.extname(file.name)}`
        await file.mv(path.resolve(__dirname, '..', 'documents', storageName))

        const originalName = Buffer.from(file.name, 'latin1').toString('utf8'); // декадирует с кадировки latin1 на utf8
        
        await Document.create({originalName: originalName, storageName: storageName, size: file.size,})
        const files = await Document.findAll()
        res.json({files})

    } catch(e){ 
        return next(ApiError.err(500, e))
    }
})

router.delete('/fileDell/:id', async(req, res, next) =>{
    const fileId = req.params.id
    const fileBd = await Document.findOne({where: {id: fileId}})
    if(!fileBd){
        return next(ApiError.err(404, 'Нет такого файла'))
    }
    await fileBd.destroy();
    const filePath = path.resolve(__dirname, '..', 'documents', fileBd.storageName)
    await fs.unlink(filePath)
    const files = await Document.findAll()
    res.json({files})
    
}) 

router.post('/registerUser', async(req, res, next) => {
    const {email, password, role} = req.body
    if(!email || !password) {
        return next(ApiError.err(400, "Некорректный email или password")) /////////
    }
    const candidate = await User.findOne({where: {email}})
    if(candidate) {
        return next(ApiError.err(404, "Такой email уже существуйет")) //////
    }
    const hashPassword = await bcrypt.hash(password, 5)
    await User.create({email, role, password: hashPassword})
    const users = await  User.findAll()
    res.json({users})
})

router.delete('/dellUser/:id', async(req, res, next) => {
    const id = req.params.id
    const user = await User.findOne({where: {id}})
    await user.destroy()
    const users = await User.findAll()
    res.json({users})
})

router.get('/', async(req, res) => {
    const users = await User.findAll()
    res.json({users})
})

module.exports = router 