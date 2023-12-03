const express = require('express')
const app = express()
const PORT = 8888;
const WatchOnlineMoviesRouter = require('./routes/watchonlinemoviesRoute');

const Movie = require('./utils/TubiTv')

app.get('/', async (req , res)=>{
       res.json(await Movie.getVideoLinks("https://tubitv.com/movies/100005891/rocketry-the-nambi-effect"));
})

// SERVER Watch Online Movies
app.use('/wom/',WatchOnlineMoviesRouter);
app.use('/wmo/',WatchOnlineMoviesRouter);
app.use('/watch-online-movies/',WatchOnlineMoviesRouter);
app.use('/watch-movies-online/',WatchOnlineMoviesRouter);


app.listen(PORT , ()=> console.log(`listening on port ${PORT}`))

