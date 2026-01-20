module.exports = function (err, req, res, next) {
    const status = err.status || 500
    const message = err.message || 'Неизвестная ошибка'
    return res.status(status).json({ message: message })
}
