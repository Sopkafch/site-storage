require('dotenv').config()
const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const path = require('path')
const cookiParser = require('cookie-parser')

const sequelize = require('./db')
const models = require('./models/models')
const router = require('./routers/index')
const HendlingError = require('./middleware/ErrorHandlingMiddleware')


const PORT = process.env.PORT || 5000
const app = express()

app.use(fileUpload({}))
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'documents')))
app.use(cookiParser())


app.use(cors({
  origin: 'http://localhost:3000', // адрес твоего фронта
  credentials: true,              // 👈 разрешаем куки
}));

app.use('/api', router)

app.use(HendlingError)

const start = async () => {
     try{
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server start = ${PORT}`))
     } catch(e){
        console.log(e)
     }
}

start()