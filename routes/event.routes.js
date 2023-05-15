const express = require('express');
const router = express.Router();

const Event = require('../models/Event.model')

const uploaderMiddleware = require('../middleware/uploader.middleware')



router.get("/events", (req, res, next) => {
    Event.find()
    .then( eventList => res.render('events/eventList', {eventList}))
    .catch(err => next(err))
});

router.get("/events/create", (req, res, next) => {
    res.render("events/eventCreate");
});

router.post("/events/create", uploaderMiddleware.single('eventImg'), (req, res, next) => {

    const { _id : planner } = req.session.currentUser
    // res.send(planner)

    const {name, description, startDate, endDate} = req.body

    const { path: eventImg } = req.file

    Event.create({name, eventImg, description, planner})
    .then(() => res.redirect('/events'))
    .catch(err => next(err))

});

router.get("/events/:id", (req, res, next) => {

    const {id} = req.params

    Event.findById(id)
    .then( event => res.render('events/eventDetails', event))
    .catch(err => next(err))
});

module.exports = router;
