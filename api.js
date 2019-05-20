// Grabbing keys through key.js using dotenv module
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var omdbKey = keys.omdb.api_key;
var concertKey = keys.bit.id;

// imports external module
var axios = require('axios');

// imports internal module for parsing data
var parseData =  require('./parse.js');

// object that contains api calls
var apiCalls = {

    // concert api call via bandsintown 
    concert: function(search) {
        console.log("**calling concert API** search: " + search);
        axios
        .get('https://rest.bandsintown.com/artists/' + search + '/events?app_id='+concertKey)
        .then(function(response){
            // sends data into parseData module
            parseData.concert(response, search);
        })
    },

    // spotify api via module node-spotify-api
    spotify: function(search) {
        if (search == 'The Sign') {
            console.warn("No input provided, using default");
        }
        console.log("**calling spotify API** search: " + search);
        spotify.search({ type: 'track', query: search, limit: 3}, function(err, data) {
            if (err) {
              return console.log('Error occurred: ' + err);
            };
            // sends data into parseData module
            parseData.spotify(data, search);
          });
    },

    // movie api via omdb
    movie: function(search) {
        console.log("**calling movie API** search: " + search);
        if (search == 'Mr.Nobody') {
            console.warn("No input provided, using default");
        }
        axios
        .get('http://www.omdbapi.com/?apikey='+omdbKey+'&t='+search)
        .then(function(response){
            // sends data into parseData module
            parseData.movie(response,search);
        })
    }
};

module.exports = apiCalls