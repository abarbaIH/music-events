const isLogged = (req, res, next) => {
    req.session.currentUser ? next() : res.redirect('/login')
}

const isNotLogged = (req, res, next) => {
    !req.session.currentUser ? next() : res.redirect('/')
}

const checkRoles = (...admittedRoles) => (req, res, next) => {

    const isAdmitted = admittedRoles.includes(req.session.currentUser.role)

    if (isAdmitted) {
        next()
    } else {
        res.render('auth/login', { errorMessage: 'Acceso no autorizado' })
    }
}

module.exports = { isLogged, isNotLogged }