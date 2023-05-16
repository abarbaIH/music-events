const loggedUser = (req, res, next) => {
    app.locals.currentUser = req.session.currentUser
    // console.log(req.session.currentUser)
    next()
}


module.exports = loggedUser