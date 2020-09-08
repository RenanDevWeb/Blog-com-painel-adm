const Sequelize = require('sequelize')
const connection = require('../database/connection')
const Category = require('../categories/Category')


const Article = connection.define('articles', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    },
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    },
})


Category.hasMany(Article)    // 1-n
Article.belongsTo(Category)   // 1-1





module.exports = Article