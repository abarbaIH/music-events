const express = require('express');
const router = express.Router();

const spotifyApi = require('../services/spotify-service')


router.get('/getArtists/:value', (req, res, next) => {

    const { value } = req.params

    spotifyApi
        .searchArtists(value, { limit: 3, market: 'ES' })
        .then(data => res.json(data.body.artists.items))
        .catch(err => res.status(500).json({message: 'Error while fetching Spotify API', err}))
})

router.get('/getOneArtist/:name', (req, res, next) => {

    const { name } = req.params

    spotifyApi
        .searchArtists(name, { limit: 1, market: 'ES' })
        .then(data => {
            const id = data.body.artists.items[0].id
            res.redirect(`/artists/${id}`)
        })
        .catch(err => res.status(500).json({message: 'Error while fetching Spotify API', err}))
})

module.exports = router