const express = require('express')
const router = express.Router()



router.get('/articles',(req,res) => {
    res.send('Rota Articles')
})
router.get('/admin/articles/new',(req,res) => {
    res.send('Rota Categories')
})


module.exports = router;