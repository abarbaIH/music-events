const express = require('express');
const router = express.Router();

const spotifyApi = require('../services/spotify-service')


router.get('/api/getArtists/:value', (req, res, next) => {

    const { value } = req.params

    spotifyApi.searchArtists(value, { limit: 3, market: 'ES' })
        .then(data => {
            // res.send(data.body.artists.items)
            res.json(data.body.artists.items)
            // console.log(data.body.artists.items)
            // res.render('artists/artistList.hbs', { artistList: data.body.artists.items })
        })
        .catch(err => console.log('The error while searching artists occurred: ', err));
})

router.get('/api/getOneArtist/:name', (req, res, next) => {

    const { name } = req.params


    spotifyApi.searchArtists(name, { limit: 1, market: 'ES' })
    .then(data => {
            // res.send(data.body.artists.items)
            res.render('artists/artistDetail', ...data.body.artists.items)
            // res.send(data.body.artists.items)
            // res.json(data.body.artists.items)
            // console.log(data.body.artists.items)
            // res.render('artists/artistList.hbs', { artistList: data.body.artists.items })
        })
        .catch(err => console.log('The error while searching artists occurred: ', err));
})

module.exports = router
