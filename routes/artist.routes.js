const express = require('express');
const router = express.Router();

const spotifyApi = require('../services/spotify-service');
const User = require('../models/User.model');


router.get("/", (req, res, next) => {

    spotifyApi.searchArtists(`year:2023`, { limit: 20, market: 'ES' })
        .then(data => res.render('artists/artistList.hbs', { artistList: data.body.artists.items }))
        .catch(error => next(error))
})


router.get("/search", (req, res, next) => {
    res.render('artists/artistSearch')
})

router.get("/search-results", (req, res, next) => {

    const { nameArtist } = req.query

    spotifyApi
        .searchArtists(nameArtist, { limit: 8, market: 'ES' })
        .then(({body}) => res.render('artists/artistList.hbs', { artistList: body.artists.items }))
        .catch(error => next(error))
})


router.get("/:id", (req, res, next) => {

    const { id } = req.params

    const {_id} = req.session.currentUser

    User.findById(_id)
    .then(user => {
        let isFavorite = false
        user.favoriteArtists.forEach(artist => {
            if (artist.id == id) isFavorite = true
        })
        spotifyApi.getArtist(id)
        .then(({body}) => res.render('artists/artistDetail', {body, isFavorite}))
    })
    .catch(error => next(error))

    // spotifyApi
    //     .getArtist(id)
    //     .then(({body}) =>{
    //         res.render('artists/artistDetail', body)
    //     })
    //     .catch(error => next(error))

})


module.exports = router