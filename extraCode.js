//Function to request what kind of Spotify search they user wants to complete
askSpotify: function() {
    inquirer
        .prompt([
        {
            type: "list",
            message: "What kind of Spotify search do you want to complete?",
            choices: ['artist', 'album', 'track'],
            name: "spotifyType"
        },
        {
            message: "What do you want to search?",
            name: "searchString"
        },
        ])
        .then(function(inquirerResponse) {
            spotifyType = inquirerResponse.spotifyType
            searchString = inquirerResponse.searchString

            liriApplication.spotify();
        });
},

// promise in the works to async askSpotify()
var prom = new Promise(function(resolve, reject) {
    if (true) {
        console.log(liriApplication.spotifyType)
        console.log("PROMISE TRUE")
        resolve()
    }
})
prom.then(function() {
    liriApplication.askWhatSearch()
    console.log("Promise THEN")
})
prom.finally(function() {
    console.log("FINALLY")
})



if (liriApplication.askWhatSearch()) {
    console.log("HEREEEEE")
    switch (liriFunction[0]) {
        case 'concert':

            break;
        case 'spotify':
            this.spotify();
            break;
        case 'movie':

            break;
    };
}

fs.open('message.txt', 'a', (err, fd) => {
    if (err) throw err;
    fs.appendFile(fd, 'data to append', 'utf8', (err) => {
      fs.close(fd, (err) => {
        if (err) throw err;
      });
      if (err) throw err;
    });
});


// adding response for spotify into file to better read full object content
var responseContent = JSON.stringify(response);
console.log('*************CONTENT RESPONSE************: ' +responseContent);

fs.open('spotifyRes.json', 'a', (err, fd) => {
    if (err) throw err;
    fs.appendFile(fd, responseContent, 'utf8', (err) => {
      fs.close(fd, (err) => {
        if (err) throw err;
      });
      if (err) throw err;
    });
});