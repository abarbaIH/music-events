const express = require('express');
const router = express.Router();

const User = require('../models/User.model');
const Event = require('../models/Event.model');


/* GET profile page */
router.get("/profile", (req, res, next) => {

  const { _id } = req.session.currentUser

<<<<<<< HEAD
  User.findById(_id)
    .then(user => res.render("users/profile", user))
=======
  Event.find({assistants: {$in: _id}})
  .then( eventList => {
      User.findById(_id)
      .then(user => res.render("users/profile" , {user, eventList}))
  })
  .catch(err => next(err))


  // User.findById(_id)
  // .then(user => res.render("users/profile" , user))
>>>>>>> 647b65196dc6f9bebeb87d4827d42b83004911a6

});

module.exports = router;
