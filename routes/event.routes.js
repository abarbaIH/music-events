const express = require('express');
const router = express.Router();

const Event = require('../models/Event.model')

const spotifyApi = require('../services/spotify-service')

const uploaderMiddleware = require('../middlewares/uploader.middleware')
const { isLogged, checkRoles } = require('../middlewares/routeGuard.middleware');
const { formatDate } = require('../utils/date-format');


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
    const {name, description, startDate: start, endDate: end, lat, lon, ...artistsReceived} = req.body
    const date = { start, end }
    const artists = Object.values(artistsReceived)
    const location = {
        type: 'point' ,
        coordinates: [lat , lon]
    }

    if (req.file) {
        const { path: eventImg } = req.file
        Event.create({name, eventImg, description, date, planner, location, artists})
        .then(() => res.redirect('/events'))
        .catch(err => next(err))
    } else {
        Event.create({name, description, date, planner, location, artists})
        .then(() => res.redirect('/events'))
        .catch(err => next(err))
    }

});


router.get("/:id", isLogged, (req, res, next) => {

    const {id} = req.params

    Event.findById(id)
    .populate('assistants')
    .populate('planner')
    .then( event => {
        let isOwner
        if(req.session.currentUser){
            isOwner = req.session.currentUser._id === event.planner.id
        } else isOwner = false
        const startDateFormatted = formatDate(event.date.start)
        const endDateFormatted = formatDate(event.date.end)
        let assist = false
        event.assistants.forEach( elm => {
            if (elm._id.toString() == req.session.currentUser._id) assist = true
        })
        res.render('events/eventDetails' , {event , isOwner, startDateFormatted, endDateFormatted, assist})
    })
    .catch(err => next(err))
});


router.get("/:id/edit", isLogged, checkRoles("PLANNER" , "ADMIN"), (req, res, next) => {

    const {id} = req.params

    Event.findById(id)
    .populate('assistants planner')
    .then(event => {
        if (req.session.currentUser._id === event.planner.id || req.session.currentUser.role==="ADMIN") {
            const startDateFormatted = formatDate(event.date.start)
            const endDateFormatted = formatDate(event.date.end)
            res.render('events/eventEdit' , {event , startDateFormatted , endDateFormatted} )
        } else {
            res.redirect(`/events/${id}`)
        }
    })
    .catch(err => next(err))
});

router.post("/:id/edit", isLogged, uploaderMiddleware.single('eventImg'), (req, res, next) => {

    const {id} = req.params
    const {name, description, startDate: start, endDate: end, lat, lon, ...artistsReceived} = req.body
    const date = { start, end }
    const location = {
        type: 'point' ,
        coordinates: [lat , lon]
    }
    const artists = Object.values(artistsReceived)
    if (req.file) {
        const { path: eventImg } = req.file
        Event.findByIdAndUpdate(id, {name, eventImg, description, date, location, artists})
        .then(() => res.redirect(`/events/${id}`))
        .catch(err => next(err))
    } else {
        Event.findByIdAndUpdate(id, {name, description, date, location, artists})
        .then(() => res.redirect(`/events/${id}`))
        .catch(err => next(err))
    }

});


router.post("/:id/delete", isLogged, checkRoles("PLANNER" , "ADMIN"), (req, res, next) => {

    const {id} = req.params
        
    Event.findById(id)
    .then(event => {
        if (req.session.currentUser._id === event.planner.id || req.session.currentUser.role==="ADMIN") {
            Event.findByIdAndDelete(id)
            .then(() => res.redirect('/events'))
            .catch(err => next(err))
        } else {
            res.redirect(`/events/${id}`)
        }
    })
    .catch(err => next(err))

})


router.post("/:id/assist", isLogged, (req, res, next) => {

    const {id: eventId} = req.params
    const {_id: userId} = req.session.currentUser

    Event.findByIdAndUpdate(eventId, { $addToSet: { assistants: userId } })
    .then(() => res.redirect(`/events/${eventId}`))
    .catch(err => next(err));

});

router.post("/:id/notassist", isLogged, (req, res, next) => {

    const {id: eventId} = req.params
    const {_id: userId} = req.session.currentUser

    Event.findByIdAndUpdate(eventId, { $pull: { assistants: userId } })
    .then(() => res.redirect(`/events/${eventId}`))
    .catch(err => next(err));

});


module.exports = router;
