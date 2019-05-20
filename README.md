# liri-node-app
LIRI is a _Language_ Interpretation and Recognition Interface program. This is a command line interface application using Node.js

This program was made as part of my Coding Bootcamp to learn and get familiar with Node and modular Javascript.

Modules utilized:
* [axios](https://www.npmjs.com/package/axios) - API requests
* [dotenv](https://www.npmjs.com/package/dotenv) - Create envoirnment variables that hold local API credentials
* [inquirer](https://www.npmjs.com/package/inquirer) - CLI prompts that requests user input
* [moment](https://www.npmjs.com/package/moment) - Transform API reponse for date
* [fs](https://nodejs.org/api/fs.html) - parse random.txt for do() and log data

Additionally, I split this program into 5 modules to better understand modular JS and for seperation of concerns

# Functions

LIRI has 4 functions
* concert-this
* spotify-this-song
* movie-this
* do-what-it-says

Once the user selects either of the first 3 functions, it will request an input. This input will be the search string used against the selected function.

### concert-this
Use: Grabs list of upcoming music shows for artist
API: http://www.artists.bandsintown.com/bandsintown-api

### spotify-this-song
Use: List up to 5 songs that match the user's search
API: https://developer.spotify.com/documentation/web-api/
Module: https://www.npmjs.com/package/node-spotify-api

### movie-this
Use: Grabs movie details for user's search
API: http://www.omdbapi.com/

### do-what-it-says
Use: Parses random.txt to find the function and input and execute accordingly