const express = require('express')
const bodyParser = require('body-parser')
const { static } = require('express')
const session = require('express-session')
const app = express()

// imports from databse
const conection = require('./database/connection')

// models databse
const Article = require('./articles/Article')
const Category = require('./categories/Category')
const User = require('./user/User')


// routes
const CategoriesControler = require('./categories/CategoriesController')
const ArticlesControler = require('./articles/ArticlesController')
const UsersControler = require('./user/UserController')

// view engine
app.set('view engine', 'ejs')



//gereciamento de sessoes
app.use(session({
    secret: "renansalmazio",
    cookie: {maxAge: 30000000 }
}))




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
app.use('/', UsersControler)

//Redis para sessions baseado em outra storage sem momoria



app.get('/', (req,res) => {
    Article.findAll({
        order: [
            ['id','DESC']
        ],
        limit: 4
    }).then(articles => {
            Category.findAll().then(categories => {
                    res.render('index', {
                        articles: articles,
                        categories: categories
                    })
            })


       
    })
})


app.get('/:slug', (req,res) => {
    const slug = req.params.slug
    Article.findOne({
        where: {
            slug: slug
        }
    }).then(article => {
        if(article != undefined){
            Category.findAll().then(categories => {
                res.render('article', {
                    article: article,
                    categories: categories
                })
        })
            
        }else{
            res.redirect('/')
        }
    }).catch(err => res.redirect("/"))
})

app.get('/category/:slug',(req,res)=> {
    const slug = req.params.slug
        Category.findOne({
            where: {
                slug: slug
            },
            include: [{model: Article}]
        }).then(category => {
            if(category != undefined){
                Category.findAll().then(categories => {
                    res.render("index", {
                        articles: category.articles,
                        categories: categories
                    })
                })
            }else{
                res.redirect("/")
            }
        }).catch(() => res.redirect("/"))
})

app.listen(3000, () => { console.log('servidor subiu')})