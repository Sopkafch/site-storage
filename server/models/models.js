const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: 'USER'}

})

const Document = sequelize.define('document', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    originalName: {type: DataTypes.STRING},
    storageName: { type: DataTypes.STRING, allowNull: false, unique: true },
    size: { type: DataTypes.INTEGER, allowNull: false },
})

module.exports = {
    User,
    Document
}