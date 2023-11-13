const express = require('express')
const app = express()
const PORT = 8888;
const Movie = require('./Movie')


app.get('/' , async function(req , res){
    const movies = await Movie.getHome();
    res.status(200).json(movies)
})


app.get('/imdb' , async function(req , res){
    const movies = await Movie.getTopImbdb();
    res.status(200).json(movies)
})
app.get('/imdb/page/:num' , async function(req , res){
    const movies = await Movie.getTopImbdb(req.params.num);
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


app.get('/genre/:type/page/:num' , async function(req , res){
    const movies = await Movie.getGenre(req.params.type,req.params.num);
    res.status(200).json(movies)
})
app.get('/genre/:type' , async function(req , res){
    const movies = await Movie.getGenre(req.params.type);
    res.status(200).json(movies)
})



app.get('/:network/page/:num' , async function(req , res){
    const movies = await Movie.getTopNetworks(req.params.network,req.params.num);
    res.status(200).json(movies)
})
app.get('/:network' , async function(req , res){
    const movies = await Movie.getTopNetworks(req.params.network);
    res.status(200).json(movies)
})



app.listen(PORT , ()=> console.log(`listening on port ${PORT}`))