const isLogged = (req, res, next) => {
    req.session.currentUser ? next() : res.redirect('/login')
}

const isNotLogged = (req, res, next) => {
    !req.session.currentUser ? next() : res.redirect('/')
}

module.exports = { isLogged, isNotLogged }