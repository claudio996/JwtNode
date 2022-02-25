const express = require('express'),
    router = express.Router(),
    conexion = require('../database/db'),
    AuthController = require('../controllers/AuthController')

//router for views
router.get('/', AuthController.isAuthenticated, (req, res) => {
    res.render('index', { user: req.user })
})

router.get('/login', (req, res) => {
    res.render('login', { alert: false })
})

router.get('/register', (req, res) => {
    res.render('register')
})



//router for methods for controllers.
router.post('/register', AuthController.register) // point to method register.
router.post('/login', AuthController.login) //point to method login.
router.get('/logout', AuthController.logout) //point to method login.

module.exports = router //