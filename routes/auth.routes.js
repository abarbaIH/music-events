const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const saltRounds = 10

const User = require('../models/User.model')
const uploaderMiddleware = require('../middlewares/uploader.middleware')
const { isLogged, isNotLogged } = require('../middlewares/routeGuard.middleware')


router.get("/signup", isNotLogged, (req, res, next) => {
    res.render("auth/signup")
});

router.post("/signup", isNotLogged, uploaderMiddleware.single('profileImg'), (req, res, next) => {

    const { username, email, plainPassword } = req.body

    if (username.length === 0 || plainPassword.length === 0 || email.length === 0) {
        res.render('auth/signup', { errMessage: '***fields are required***' })
        return
    }

    if (req.file) {
        const { path: profileImg } = req.file
        bcrypt
        .genSalt(saltRounds)
        .then(salt => bcrypt.hash(plainPassword, salt))
        .then(hashedPass => User.create({ username, email, profileImg, password: hashedPass }))
        .then(() => res.redirect('/'))
        .catch(err => next(err))
    } else {
        bcrypt
        .genSalt(saltRounds)
        .then(salt => bcrypt.hash(plainPassword, salt))
        .then(hashedPass => User.create({ username, email, password: hashedPass }))
        .then(() => res.redirect('/'))
        .catch(err => next(err))
    }

});


router.get("/login", isNotLogged, (req, res, next) => {
    res.render("auth/login")
})

router.post('/login', isNotLogged, (req, res, next) => {

    const { email, password } = req.body

    if (email.length === 0 || password.length === 0) {
        res.render('auth/login', { errMessage: 'Los campos son obligatorios' })
        return
    }

    User
        .findOne({ email })
        .then(user => {

            if (!user) {
                res.render('auth/login', { errMessage: 'Email no registrado en la Base de Datos' })
                return
            }

            if (bcrypt.compareSync(password, user.password) === false) {
                res.render('auth/login', { errMessage: 'La contraseña es incorrecta' })
                return
            }

            req.session.currentUser = user
            res.redirect('/profile')

        })
        .catch(error => next(error))
})


router.get('/logout', isLogged, (req, res, next) => {
    req.session.destroy(() => res.redirect('/'))
})


module.exports = router;