const express = require('express')
const router = express.Router()
const Category = require("../categories/Category")
const Article = require("../articles/Article")
const slugify = require('slugify')



router.get('/admin/articles',(req,res) => {
        Article.findAll({
            include: [{model: Category}]
        }).then(articles => {

            res.render('admin/articles/index', {
                articles: articles
            })
        })

})
router.get('/admin/articles/new',(req,res) => {
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