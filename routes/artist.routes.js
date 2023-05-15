const express = require('express');
const router = express.Router();

const spotifyApi = require('../services/spotify-service')

/* GET artists page */
router.get("/artists", (req, res, next) => {

    let currentYear = new Date().getFullYear()
    // res.send(year)

    spotifyApi.searchArtists(`year:2023`, { limit: 20, market: 'ES' })
        .then(data => {
            // res.send(data.body.artists.items)
            // console.log(data.body.artists.items)
            res.render('artists/artistList.hbs', { artistList: data.body.artists.items })
        })
        .catch(err => console.log('The error while searching artists occurred: ', err));

});

router.get("/artists/search", (req, res, next) => {

    res.render('artists/artistSearch')

})

router.get("/artist/search", (req, res, next) => {

    const { nameArtist } = req.query

    spotifyApi.searchArtists(nameArtist, { limit: 8, market: 'ES' })
        .then(data => {
            // res.send(data.body.artists.items)
            // console.log(data.body.artists.items)
            res.render('artists/artistList.hbs', { artistList: data.body.artists.items })
        })
        .catch(err => console.log('The error while searching artists occurred: ', err));
})

router.get("/artists/:id", (req, res, next) => {

    const { id } = req.params
    // res.render('artists/artistDetail')

    spotifyApi.getArtist(`${id}`)
        .then(data => {
            // res.send(data.body)
            res.render('artists/artistDetail', data.body)
            // console.log('albumes-> ' , data.body.items.items)
            // res.render('albums.hbs', { albumList: data.body.items })
        })
        .catch(err => console.log('The error while searching artists occurred: ', err));
})


module.exports = router;









