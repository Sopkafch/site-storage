const Router = require('express')
const router = new Router()

const storageRouter = require('./storageRouter')
const userRouter = require('./userRouter')
const adminRouter = require('../routers/adminRouter')

const auth = require('../middleware/authMiddleware')
const checkRole = require('../middleware/checkRole')

router.use('/user', userRouter)
router.use('/storage', auth, storageRouter)
router.use('/admin', checkRole('ADMIN'), adminRouter)

module.exports = router