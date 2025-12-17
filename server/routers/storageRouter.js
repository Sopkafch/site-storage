const { v4: uuidv4 } = require('uuid'); // для имени
const path = require('path')
const Router = require('express')
const router = new Router()
const ApiError = require('../error/ApiError')
const {Document, User} = require('../models/models')

router.get('/download/:id', async(req, res, next) => {
    try{
        const {id} = req.params
        const document = await Document.findByPk(id);
        
        if (!document) {
            return next(ApiError.err(404, 'Ошибка, нет такого файла')) ///////
        }

        const file_Path = path.resolve(__dirname, '..', 'documents', document.storageName)
        res.download(file_Path, document.originalName);       
    } catch(e){

    }
})

router.get('/', async(req, res) => {
    const files = await Document.findAll()
    res.json({files})
})



module.exports = router 