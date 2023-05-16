const express = require('express');
const router = express.Router();

const spotifyApi = require('../services/spotify-service')


router.get('/api/getArtists/:value', (req, res, next) => {

    const { value } = req.params

    spotifyApi.searchArtists(value, { limit: 5, market: 'ES' })
        .then(data => {
            // res.send(data.body.artists.items)
            res.json(data.body.artists.items)
            // console.log(data.body.artists.items)
            // res.render('artists/artistList.hbs', { artistList: data.body.artists.items })
        })
        .catch(err => console.log('The error while searching artists occurred: ', err));
})

module.exports = router;
