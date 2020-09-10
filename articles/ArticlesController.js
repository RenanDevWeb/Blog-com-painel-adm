const express = require('express')
const router = express.Router()
const Category = require("../categories/Category")
const Article = require("../articles/Article")
const slugify = require('slugify')

const adminAuthenticate = require('../middlewares/adminAuth')

router.get('/admin/articles',adminAuthenticate,(req,res) => {
        Article.findAll({
            include: [{model: Category}]
        }).then(articles => {

            res.render('admin/articles/index', {
                articles: articles
            })
        })

})
router.get('/admin/articles/new',adminAuthenticate,(req,res) => {
    Category.findAll().then(categories => {
        res.render('admin/articles/new', {categories: categories})
    })
})

router.get('/admin/articles/edit/:id', (req,res) => {
    const id = req.params.id        
    
    Article.findByPk(id).then(articles => {
        if(articles != undefined){
            Category.findAll().then(categories => {
                res.render('admin/articles/edit',{
                    articles: articles,
                    categories: categories
                })
            })
                
        }else{
            res.render('admin/articles')
        }
    }).catch(err => res.redirect('/admin/articles'))
    })

router.get('/articles/page/:num',(req,res) => {
    let  page = req.params.num
    let  offset = 0
    const elementsInPage = 2
    const limit = 4
        if(isNaN(page) || page == 1){
        offset = 0
    }else{
        offset = parseInt(page)  * elementsInPage
     }

    Article.findAndCountAll({
        limit: limit,
        offset: offset,
        order: [
            ['id','DESC']
        ]
    }).then(articles => {
        let next;
        if(offset * elementsInPage >= articles.count){
            next = false
        } else{
            next = true
        }
        let result = {
            page: parseInt(page),
            next: next,
            articles: articles,
        }

        Category.findAll().then(categories => {
            res.render('admin/articles/page', {
                result: result,
                categories: categories
            })
        })
       
    })

})

router.post('/admin/articles/save', (req,res) => {
    const title = req.body.title
    const body = req.body.body
    const category = req.body.category
    Article.create({
        title: title,
        slug: slugify(title),
        body: body,
        categoryId: category 
    }).then(() => {
        res.redirect('/admin/articles')
    })
})

router.post('/articles/delete',(req,res) => {
    const id = req.body.id;
    if(id != undefined){
        if(!isNaN(id)){
            Article.destroy({
                where:{
                    id:id
                }
            }).then(() => {
                res.redirect("/admin/articles")
            }).catch(err => console.log(err))
        }else{
            res.redirect("/admin/articles")
        }
    }else{
        res.redirect("/admin/articles")
    }
})

router.post('/articles/update',(req,res)=> {
    const id = req.body.id
    const title = req.body.title
    const body = req.body.body
    const category = req.body.category
    Article.update({
        title: title,
        slug: slugify(title),
        body: body,
        categoryId: category
    },{
        where: {
            id: id
        }
    }).then(() =>  { res.redirect("/admin/articles")
}).catch(err => res.redirect("/"))
})

module.exports = router;