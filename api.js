// Grabbing keys via .env 
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var omdbKey = process.env.OMDB_KEY
var concertKey = process.env.BIT_KEY

var axios = require('axios');

var parseData =  require('./parse.js');

var apiCalls = {
    apiConcert: function(search) {
        console.log("**calling concert API** search: " + search);
        axios
        .get('https://rest.bandsintown.com/artists/' + search + '/events?app_id='+concertKey)
        .then(function(response){
            parseData.concert(response, search);
        })
    },

    apiSpotify: function(search) {
        if (search == 'The Sign') {
            console.warn("No input provided, using default");
        }
        console.log("**calling spotify API** search: " + search);
        spotify.search({ type: 'track', query: search, limit: 3}, function(err, data) {
            if (err) {
              return console.log('Error occurred: ' + err);
            };
            parseData.spotify(data, search);
          });
    },

    apiMovie: function(search) {
        console.log("**calling movie API** search: " + search);
        if (search == 'Mr.Nobody') {
            console.warn("No input provided, using default");
        }
        axios
        .get('http://www.omdbapi.com/?apikey='+omdbKey+'&t='+search)
        .then(function(response){
            parseData.movie(response,search);
        })

    }
};

module.exports = apiCalls