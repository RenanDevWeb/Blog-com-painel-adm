const Sequelize = require("sequelize")

const databaseName = 'guia_press'
const user = 'root'
const password = 'root'
const host = 'localhost'
const dialect = 'mysql'

const connection = new Sequelize(databaseName,user,password, {
    host,
    dialect
})



module.exports = connection