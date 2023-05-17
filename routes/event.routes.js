const express = require('express');
const router = express.Router();

const Event = require('../models/Event.model')

const spotifyApi = require('../services/spotify-service')

const uploaderMiddleware = require('../middlewares/uploader.middleware')
const { isLogged, checkRoles } = require('../middlewares/routeGuard.middleware')


router.get("/", (req, res, next) => {

    Event.find()
    .then( eventList => res.render('events/eventList', {eventList}))
    .catch(err => next(err))
});


router.get("/create", checkRoles("PLANNER" , "ADMIN"), (req, res, next) => {

    res.render("events/eventCreate");
});

router.post("/create", checkRoles("PLANNER" , "ADMIN"), uploaderMiddleware.single('eventImg'), (req, res, next) => {

    const { _id : planner } = req.session.currentUser
    const {name, description, startDate: start, endDate: end, ...artistsReceived} = req.body
    const { path: eventImg } = req.file

    const date = { start, end }

    const artists = Object.values(artistsReceived)

    Event.create({name, eventImg, description, date, planner, artists})
    .then(() => res.redirect('/events'))
    .catch(err => next(err))
});


router.get("/:id", (req, res, next) => {

    const {id} = req.params

    Event.findById(id)
    .populate('assistants')
    .populate('planner')
    .then( event => {
        const isOwner = req.session.currentUser._id === event.planner.id
        // res.send(isOwner)
        // console.log(req.session.currentUser._id , event.planner.id)
        res.render('events/eventDetails' , {event , isOwner})
    })
    .catch(err => next(err))
});


router.get("/:id/edit", isLogged, (req, res, next) => {

    const {id} = req.params

    Event.findById(id)
    .populate('assistants planner')
    .then(event => {
        if (req.session.currentUser._id === event.planner.id) {
            res.render('events/eventEdit' , event )
        } else {
            res.redirect(`/events/${id}`)
        }
        // res.send(isOwner)
        // console.log(req.session.currentUser._id , event.planner.id)

    })
    .catch(err => next(err))
});

router.post("/:id", uploaderMiddleware.single('eventImg'), (req, res, next) => {

    const { _id } = req.session.currentUser
    // res.send(planner)

    const {name, description, startDate, endDate} = req.body

    const { path: eventImg } = req.file

    Event.create({name, eventImg, description, planner})
    .then(() => res.redirect('/events'))
    .catch(err => next(err))

});


router.post("/:id/delete", checkRoles("PLANNER" , "ADMIN"), (req, res, next) => {

    const {id} = req.params

    Event.findByIdAndDelete(id)
    .then(() => res.redirect('/events'))
    .catch(err => next(err))

});


router.post("/:id/assist", isLogged, (req, res, next) => {

    const {id: eventId} = req.params
    const {_id: userId} = req.session.currentUser


    // CON  PROMISE ALL
    Promise.all([
        Event.findById(eventId),
        Event.findByIdAndUpdate(eventId, { $addToSet: { assistants: userId } })
    ])
    .then(() => res.redirect(`/events/${eventId}`))
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
