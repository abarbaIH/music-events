const updateUser = (req, res, next) => {

    res.locals.currentUser = req.session.currentUser
    
    if (req.session.currentUser) {
        res.locals.isAdmin = req.session.currentUser.role === "ADMIN"
        res.locals.isPlanner = req.session.currentUser.role === "PLANNER"
    }
    next()
}

module.exports = {updateUser}


// const updateUser = (req, res, next) => {

//     app.locals.currentUser = {
//         user: req.session.currentUser,
//         isAdmin: req.session.currentUser.role === "ADMIN",
//         isPlanner: req.session.currentUser.role === "PLANNER"
//     }

//     next()
// }

// module.exports = { updateUser }



