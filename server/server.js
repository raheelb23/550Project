const express = require('express');
const mysql = require('mysql');
var cors = require('cors')
const routes = require('./routes')
const config = require('./config.json')

const app = express();

app.use(cors({ credentials: true, origin: ['http://localhost:3000'] }));

//Route 1 - register as GET; route for advanced search page, to return shows based on one or more of user's preferences
app.get('/advancedsearch', routes.userChoice);

//Route 2 - register as GET; route to recommend TV shows based on range of run time of shows in minutes
app.get('/rangeruntime', routes.getTVRunTime);

//Route 3 - register as GET; route to recommend TV shows based on number of years the show has been airing within a range
app.get('/longestRunning', routes.getLongestRunningTVShow);

//Route 4 - register as GET; route to recommend TV shows based on all directors' work who share the user's birth year
app.get('/birthyear', routes.getBirthYearDirectorTV);

//Route 5 - register as GET; route to recommend TV shows based on all writers' work who share the user's birth year 
app.get('/birthyear/writers', routes.getBirthYearWriter);

//Route 6 - register as GET; route to recommend TV shows based on all actors' who share the user's birth year 
app.get('/birthyear/shows', routes.getBirthYearShows);

//Route 7 - register as GET; route to recommend TV shows that fall within the range of a users birth year
app.get('/birthyear/actors', routes.getBirthYearActor);

//Route 8 - register as GET; route to recommend TV shows based on writers of a particular genre
app.get('/writers', routes.getGenreTVWriter);

//Route 9 - register as GET; route to recommend TV shows based on cast sizes of at least minSize
app.get('/cast', routes.getCastSize);

//Route 10 - register as GET; route to recommend TV shows based on a director involved in at least x-number shows
app.get('/director', routes.directorInXShows);

//Route 11 - register as GET; route to recommend all TV shows
app.get('/basic/allshows', routes.getAllShows);

//Route 12 - register as GET; route to recommend TV shows based on highest ratings 
app.get('/basic/ratings', routes.getShowsBasedOnRating);

//Route 13 - register as GET; route to populate Watch List
app.get('/watchlist', routes.getWatchList);

//Route 14 - register as POST; route to write to Watch List 
app.post('/add', routes.addToWatchlist);

//Route 15 - register as DELETE; route to delete from Watch List
app.delete('/remove', routes.removeFromWatchlist);

//Route 16 - register as DELETE; route to clear all from Watch List
app.delete('/clear', routes.clearWatchList);

app.listen(config.server_port, () => {
    console.log(`Server running at http://${config.server_host}:${config.server_port}/`);
});

module.exports = app;
