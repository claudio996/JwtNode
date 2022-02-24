const express = require('express'),
    router = express.Router(),
    conexion = require('../database/db')

router.get('/', (req, res) => {
    res.render('index')
})

router.get('/login', (req, res) => {
    res.render('login')
})

router.get('/register', (req, res) => {
    res.render('register')
})
module.exports = router