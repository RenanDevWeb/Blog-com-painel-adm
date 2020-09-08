const express = require('express')
const bodyParser = require('body-parser')
const { static } = require('express')
const app = express()


// imports from databse
const conection = require('./database/connection')

// models databse
const Article = require('./articles/Article')
const Category = require('./categories/Category')


// routes
const CategoriesControler = require('./categories/CategoriesController')
const ArticlesControler = require('./articles/ArticlesController')

// view engine
app.set('view engine', 'ejs')

//body parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// static files
app.use(express.static('./public'))



// database connection

conection.authenticate()
.then(() => console.log(`Conectado ao banco`))
.catch(err => console.log(err))


// routes
app.use('/', CategoriesControler)
app.use('/', ArticlesControler)




app.get('/', (req,res) => {
    res.render('index')
})

app.listen(3000, () => { console.log('servidor subiu')})