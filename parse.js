var moment = require('moment');
var fs = require('fs');

var displayInfo = require('./display.js');

var parseData = {
    concert: function(response, search) {
        var eventsData = response.data;
        var eventsArr = [];
        var Event = function(name, location, date) {
            this.name = name;
            this.location = location;
            this.date = date;
        }
        eventsData.forEach(function(event){
            var name = event.venue.name;
            var country = event.venue.country
            var city = event.venue.city
            var location = city + ', ' + country
            var date = moment(event.datetime).format('L');
            eventsArr.push(new Event(name, location, date));
        });
        displayInfo.concert(eventsArr, search)
    },
    spotify: function(response, search) {
        var tracks = response.tracks.items;
        var songArr = [];
        // console.log(tracks);
        var Song = function(artists, songName, preview, album) {
            this.artists = artists;
            this.songName = songName;
            this.preview = preview;
            this.album = album;
        }

        tracks.forEach(function(track){
            artistArr = [];
            track.artists.forEach(function(artist){
                artist = artist.name
                if (artistArr.length != 0) {
                    artist = ' ' + artist
                }
                artistArr.push(artist)
            });
            
            var songName = track.name
            var preview = track.preview_url
            var album = track.album.name

            songArr.push(new Song(artistArr, songName, preview, album));

        });

        displayInfo.spotify(songArr, search)
    },
    movie: function(response, search) {
        var movieData = response.data
        var movie = {
            name: movieData.Title,
            year: movieData.Year,
            imdbRating: movieData.imdbRating,
            rottenRating: movieData.Ratings[1].Value,
            country: movieData.Country,
            language: movieData.Language,
            plot: movieData.Plot,
            name: movieData.Actors
        };

        displayInfo.movie(movie, search);
    },
};

module.exports = parseData