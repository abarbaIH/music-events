const express = require('express');
const User = require('../models/User.model');
const router = express.Router();

/* GET home page */
router.get("/profile", (req, res, next) => {

  const { _id } = req.session.currentUser

  User.findById(_id)
    .then(user => res.render("users/profile", user))

});

module.exports = router;
