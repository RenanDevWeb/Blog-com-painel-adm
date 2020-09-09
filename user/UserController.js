const express = require("express")
const router = express.Router();
const User = require('./User')


router.get('/admin/users', (req,res) => {
    res.send("lista de usuarios")
})

router.get('/admin/user/creater',(req,res) => {
    res.render('admin/users/create')
})


module.exports = router;