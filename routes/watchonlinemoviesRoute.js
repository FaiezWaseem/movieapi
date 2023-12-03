const app = require('express').Router();
const Movie = require('../utils/WatchOnlineMovie')



app.get('/' , async function(req , res){
    const movies = await Movie.getHome();
    res.status(200).json(movies)
})


app.get('/movie/link' , async function(req , res){
    console.log(req.query.link)
    const link = await Movie.movieLink(req.query.link)
    res.status(200).json({link})
})
app.get('/search/:query/?:pageNum' , async function(req , res){
    const movies = await Movie.search(req.params.query , req.params.pageNum)
    res.status(200).json(movies)
})



app.get('/:category/page/:num' , async function(req , res){
    const movies = await Movie.getMovieByCategory(req.params.category,req.params.num);
    res.status(200).json(movies)
})
app.get('/:category' , async function(req , res){
    const movies = await Movie.getMovieByCategory(req.params.category);
    res.status(200).json(movies)
})



module.exports = app;