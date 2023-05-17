const express = require('express');
const router = express.Router();

const Event = require('../models/Event.model')

const spotifyApi = require('../services/spotify-service')

const uploaderMiddleware = require('../middlewares/uploader.middleware')
const { isLogged, isNotLogged, checkRoles } = require('../middlewares/routeGuard.middleware')



router.get("/events", (req, res, next) => {

    Event.find()
    .then( eventList => res.render('events/eventList', {eventList}))
    .catch(err => next(err))
});


// --------------------------------------------------------------------------------------------------------

router.get("/events/create", checkRoles("PLANNER" , "ADMIN"), (req, res, next) => {
    res.render("events/eventCreate" , {spotifyApi});
});

router.post("/events/create", checkRoles("PLANNER" , "ADMIN"), uploaderMiddleware.single('eventImg'), (req, res, next) => {

    const { _id : planner } = req.session.currentUser
    const {name, description, startDate, endDate, ...artistsReceived} = req.body
    const { path: eventImg } = req.file
    const date = {
        start: startDate,
        end: endDate
    }

    const artists = Object.values(artistsReceived)

    Event.create({name, eventImg, description, date, planner, artists})
    .then(() => res.redirect('/events'))
    .catch(err => next(err))

});


// --------------------------------------------------------------------------------------------------------


router.get("/events/:id", (req, res, next) => {

    const {id} = req.params

    Event.findById(id)
    .populate('assistants')
    .then( event => res.render('events/eventDetails', event))
    .catch(err => next(err))
});


// --------------------------------------------------------------------------------------------------------


// router.get("/events/:id/edit", (req, res, next) => {
//     res.render("events/eventCreate");
// });

// router.post("/events/:id", uploaderMiddleware.single('eventImg'), (req, res, next) => {

//     const { _id : planner } = req.session.currentUser
//     // res.send(planner)

//     const {name, description, startDate, endDate} = req.body

//     const { path: eventImg } = req.file

//     Event.create({name, eventImg, description, planner})
//     .then(() => res.redirect('/events'))
//     .catch(err => next(err))

// });


// --------------------------------------------------------------------------------------------------------

router.post("/events/:id/delete", (req, res, next) => {

    const {id} = req.params

    Event.findByIdAndDelete(id)
    .then( () => res.redirect('/events'))
    .catch(err => next(err))

});


// --------------------------------------------------------------------------------------------------------


router.post("/events/:id/assist", (req, res, next) => {

    const {id} = req.params

    const {_id} = req.session.currentUser


    // CON  PROMISE ALL
    Promise.all([
        Event.findById(id),
        Event.findByIdAndUpdate(id, { $addToSet: { assistants: _id } })
    ])
    .then( () => res.redirect(`/events/${id}`))
    .catch(err => next(err));


    // SIN PROMISE ALL
    // Event.findById(id)
    // .then(event => {
    //     event.assistants.push(_id)
    //     Event.findByIdAndUpdate(id, {assistants: event.assistants})
    //     .then( () => res.redirect(`/events/${id}`))        
    // }) 
    // .catch(err => next(err))

});



module.exports = router;
