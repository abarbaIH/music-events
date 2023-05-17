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
        res.render('index', { errorMessage: 'Access Denied' })
    }
}

const checkPlannerOrAdmin = (req, res, next) => {

    const {id} = req.params

    !req.session.currentUser ? next() : res.redirect('/')
}

module.exports = { isLogged, isNotLogged , checkRoles }