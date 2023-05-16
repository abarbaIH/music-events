const express = require('express');
const router = express.Router();

const User = require('../models/User.model');
const Event = require('../models/Event.model');


/* GET profile page */
router.get("/profile", (req, res, next) => {

  const { _id } = req.session.currentUser

  Event.find({ assistants: { $in: _id } })
    .then(eventList => {
      User.findById(_id)
        .then(user => res.render("users/profile", { user, eventList }))
    })
    .catch(err => next(err))
});


module.exports = router
