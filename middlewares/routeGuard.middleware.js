const isLogged = (req, res, next) => {
    req.session.currentUser ? next() : res.redirect('/login')
}

const isNotLogged = (req, res, next) => {
    !req.session.currentUser ? next() : res.redirect('/')
}

const checkRoles = (...admittedRoles) => (req, res, next) => {

    if (req.session.currentUser){
        
        const isAdmitted = admittedRoles.includes(req.session.currentUser.role)
    
        if (isAdmitted) {
            next()
        } else {
            res.redirect('/')
        }

    } else {
        res.redirect('/login')
    }

}

const checkPlannerOrAdmin = (req, res, next) => {

    const {id} = req.params

    !req.session.currentUser ? next() : res.redirect('/')
}

module.exports = { isLogged, isNotLogged , checkRoles }