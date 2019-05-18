var logData = require('./log.js')

var displayInfo = {

    concert: function(data, search){
        var result = [];
        this.formatDisplay()
        result.push('Upcoming Events for: '+ search +'\n')
        data.forEach(function(event) {
            for (eventDetails in event) {
                result.push(eventDetails +': '+ event[eventDetails])
                if (eventDetails == 'date') {
                    result.push('')
                };
            };
        });
        console.log(result.join('\n'))
        console.groupEnd()
        logData.log(result);
    },

    spotify: function(data, search){
        result = [];
        this.formatDisplay()
        result.push('Results from Spotify for: '+ search +'\n');
        data.forEach(function(song) {
            for (songDetails in song) {
                if (song[songDetails] == undefined) {
                    song[songDetails] = "Not available"
                };
                result.push(songDetails +': '+ song[songDetails])
                if (songDetails == 'album') {
                    result.push('')
                };
            };
        });
        console.log(result.join('\n'))
        console.groupEnd()
        logData.log(result);
    },

    movie: function(data, search){
        result = [];
        this.formatDisplay()
        result.push('Movie results for: '+ search +'\n');
        for (movieDetails in data) {
            if (data[movieDetails] == undefined) {
                data[movieDetails] = "Not available"
            };
            result.push(movieDetails +': '+ data[movieDetails])
            if (movieDetails == 'album') {
                result.push('')
            };
        };
        console.log(result.join('\n'))
        console.groupEnd()
    },

    formatDisplay: function() {
        console.clear()
        console.group()
        logData.log(result);
    }
};

module.exports = displayInfo