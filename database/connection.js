const Sequelize = require("sequelize")
const dotenv = require('dotenv');
dotenv.config()

const databaseName = process.env.DB_NAME
const user = process.env.BD_USER || 'xxxxxxx'
const password = process.env.DB_PASS || 'xxxxxx'
const host =  process.env.DB_HOST
const dialect = process.env.BD_DIALECT

const connection = new Sequelize(databaseName,user,password, {
    host,
    dialect
})



module.exports = connection