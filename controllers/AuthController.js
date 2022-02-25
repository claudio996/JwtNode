const jwt = require('jsonwebtoken'),
    bcryptjs = require('bcryptjs'),
    dbConexion = require('../database/db'),

    { promisify } = require('util'); //use prommise for asyncronium mode.

//procedure for register

exports.register = async(req, res) => {
    try {
        const data = {
            name: req.body.name,
            users: req.body.user,
            pass: req.body.password
        };

        let passHash = await bcryptjs.hash(data.pass, 8) //encrypt password
        console.log(passHash);
        dbConexion.query('INSERT INTO USERS SET ?', { //query
                user: data.users,
                name: data.name,
                password: passHash
            },
            (error, results) => {
                if (error) { console.log(error) }
                res.redirect('/') //redirect root 
            })

    } catch (error) {
        console.log(error);
    }
}
exports.login = async(req, res) => {
    try {
        const data = {
            user: req.body.user,
            pass: req.body.password
        }
        if (!data.user || !data.pass) { //using sweetalert
            res.render('login', {
                alert: true,
                alertTitle: "Advertencia",
                alertMessage: 'Enter your user and password',
                alertIcon: 'info',
                showConfirmButton: true,
                timer: false,
                ruta: 'login'
            })
        } else {
            dbConexion.query('SELECT * FROM USERS WHERE USER =  ?', [data.user], async(error, results) => {
                if (results.length == 0 || !await bcryptjs.compare(data.pass, results[0].password)) {
                    res.render('login', {
                        alert: true,
                        alertTitle: "Error",
                        alertMessage: 'Enter your user and password',
                        alertIcon: 'info',
                        showConfirmButton: true,
                        timer: false,
                        ruta: 'login'
                    })
                } else {
                    //ok
                    const id = results[0].id,
                        token = jwt.sign({ id: id }, process.env.JWT_SECRET, {
                            expiresIn: process.env.JWT_TIME_EXPIRED,

                        })
                    console.log(token);
                    const cookieOptions = {
                        expires: new Date(Date.now() * process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                        httpOnly: true
                    }
                    res.cookie('jwt', token, cookieOptions)
                    res.render('login', {
                        alert: true,
                        alertTitle: "Conexion exit",
                        alertMessage: 'Correct login!',
                        alertIcon: 'success',
                        showConfirmButton: false,
                        timer: 800,
                        ruta: ''
                    })
                }
            })
        }
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}
exports.isAuthenticated = async(req, res, next) => {
    if (req.cookies.jwt) {
        try {
            const decodificated = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET)
            dbConexion.query('SELECT * FROM USERS WHERE id = ?', [decodificated.id], (error, results) => {
                if (!results) { return next() }
                req.user = results[0]

                return next()
            });

        } catch (error) {
            console.log(error)
            return next()
        }
    } else {
        res.redirect('/login')
    }
}
exports.logout = (req, res) => {
    res.clearCookie('jwt')
    return res.redirect('/')
}