const express = require('express');
const router = express.Router();

const User = require('../models/User.model');
const Event = require('../models/Event.model');

const uploaderMiddleware = require('../middlewares/uploader.middleware')
const { isLogged, isNotLogged, checkRoles } = require('../middlewares/routeGuard.middleware')


router.get("/profile", isLogged, (req, res, next) => {

  const { _id } = req.session.currentUser

  Promise.all([
      User.findById(_id) ,
      Event.find({ assistants: { $in: _id } })
  ])
  .then(([user, eventList]) => res.render('users/profile', {user , eventList}))
  .catch(err => next(err))

})


router.get("/profile/edit", isLogged, (req, res, next) => {

    const { _id } = req.session.currentUser

    User.findById(_id)
    .then( user => res.render('users/editProfile', user))
    .catch(err => next(err))

});

router.post("/profile/edit", isLogged, uploaderMiddleware.single('profileImg'), (req, res, next) => {

    const { _id } = req.session.currentUser
    const { username, email } = req.body

    if (username.length === 0 || email.length === 0) {
        res.render('users/:id/edit', { errMessage: '***fields are required***' })
        return
    }

    if (req.file){
        const { path: profileImg } = req.file
        User.findByIdAndUpdate(_id, {username, email, profileImg})
        .then( () => res.redirect(`/profile`))
        .catch(err => next(err))
    } else {
        User.findByIdAndUpdate(_id, {username, email})
        .then( () => res.redirect(`/profile`))
        .catch(err => next(err))
    }

});


router.get("/users", checkRoles("ADMIN"), (req, res, next) => {

    User.find()
    .then( userList => res.render('users/userList', {userList}))
    .catch(err => next(err))

});

router.get("/users/:id", isLogged, (req, res, next) => {

    const {id} = req.params
    const isAdmin = req.session.currentUser.role === 'ADMIN'

    User.findById(id)
    .then( user => res.render('users/userDetails', {user , isAdmin}))
    .catch(err => next(err))

});

router.get("/users/:id/edit", checkRoles('ADMIN'), (req, res, next) => {

    const {id} = req.params

    User.findById(id)
    .then( user => res.render('users/editUser', user))
    .catch(err => next(err))
    
});

router.post("/users/:id/edit", isLogged, checkRoles('ADMIN'), uploaderMiddleware.single('profileImg'), (req, res, next) => {

    const { id } = req.params
    const { username, email, role } = req.body
    
    if (username.length === 0 || email.length === 0) {
        res.render('users/:id/edit', { errMessage: '***fields are required***' })
        return
    }
    if (req.file){
        const { path: profileImg } = req.file

        User.findByIdAndUpdate(id, {username, email, profileImg, role})
        .then( () => res.redirect(`/users/${id}`))
        .catch(err => next(err))
    } else {
        User.findByIdAndUpdate(id, {username, email, role})
        .then( () => res.redirect(`/users/${id}`))
        .catch(err => next(err))
    }

});


router.post("/users/:id/delete", isLogged, checkRoles('ADMIN'), (req, res, next) => {

    const { id } = req.params
    
    User.findByIdAndDelete(id)
    .then(() => res.redirect("/users"))
    .catch(err => next (err))
  
})

router.post("/users/addfavorite", isLogged, (req, res, next) => {

    const {artist} = req.body
    const {_id} = req.session.currentUser

    const artistStructured = {
        id: artist[1],
        name: artist[0],
    }

    User
    .findByIdAndUpdate(_id, { $addToSet: {favoriteArtists: artistStructured}})
    .then(() => res.redirect(`/artists/${artistStructured.id}`))
    .catch(err => next (err))
  
})

router.post("/users/removefavorite", isLogged, (req, res, next) => {

    const {artist} = req.body
    const {_id} = req.session.currentUser

    const artistStructured = {
        id: artist[1],
        name: artist[0],
    }

    User
    .findByIdAndUpdate(_id, { $pull: {favoriteArtists: artistStructured}})
    .then(() => res.redirect(`/artists/${artistStructured.id}`))
    .catch(err => next (err))
  
})


module.exports = router
