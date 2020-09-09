const Sequelize = require("sequelize")
const dotenv = require('dotenv');
dotenv.config()

const databaseName = process.env.DB_NAME
const user = process.env.BD_USER || 'root'
const password = process.env.DB_PASS || 'root'
const host =  process.env.DB_HOST
const dialect = process.env.BD_DIALECT
const timezone = "-03:00"

const connection = new Sequelize(databaseName,user,password, {
    host,
    dialect,
    timezone, 
})



module.exports = connection