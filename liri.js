require("dotenv").config();
var inquirer = require('inquirer');
var fs = require('fs');

var apiCalls = require('./api.js');

var liriApplication = {

    askWhichFunction: function() {
        inquirer
            .prompt([ 
            {
                type: "list",
                message: "Select a LIRI Function",
                choices: ['concert-this', 'spotify-this-song', 'movie-this', 'do-what-it-says'],
                name: "liriFunctions"
            },
            ])
            .then(function(inquirerResponse) {
                selectedFunction = inquirerResponse.liriFunctions.split('-');

                liriApplication.identifyFunction(selectedFunction);
            });
    },

    identifyFunction: function(selectedFunction) {
        // console.log(liriFunction)
        if (selectedFunction[0] == 'do') {
            this.do();
        } else {
            this.askWhatSearch(selectedFunction[0])
        };
        
    },

    askWhatSearch: function(selectedFunction) {
        
        var Prompt = function(question, message, defaultStr) {
            this.type = 'input';
            this.name = 'searchString';
            switch (question) {
                case 'concert':
                    this.message = message;
                    this.validate = function(input) {
                        var done = this.async();
                        setTimeout(function() {
                        if (input == '') {
                            done('You need enter a music artist or band');
                            return;
                        }
                        done(null, true);
                        }, 1000);
                    }
                    break;
                default:
                    this.message = message;
                    this.default = defaultStr;
                    break;
            };
        };
        
        switch (selectedFunction) {
            case 'concert':
                var promptObj = new Prompt(selectedFunction, 'What artist(s) would you like to see upcoming concerts for?')
                break;
            case 'spotify':
                var promptObj = new Prompt(selectedFunction, "What's the song name you would like to find?", 'The Sign');
                break;
            case 'movie':
                var promptObj = new Prompt(selectedFunction, 'What movie would you like to learn more about?', 'Mr.Nobody');
                break;
        };

        inquirer
        .prompt([ 
        promptObj,
        ])
        .then(function(inquirerResponse) {
            searchString = inquirerResponse.searchString
            liriApplication[selectedFunction](searchString);
        });
    },

    concert: function(searchString) {
        apiCalls.apiConcert(searchString);
    },

    spotify: function(searchString) {
        apiCalls.apiSpotify(searchString);
    },

    movie: function(searchString) {
        apiCalls.apiMovie(searchString);
    },

    do: function() {
        console.log("Running 'do' function, pulling parameters from random.txt");
        fs.readFile('./random.txt', 'utf8', function(err, data) {
            if (err) throw err;
            var randomFunction = data.split(',');
            var selectedFunction = randomFunction[0].split('-');
            var searchString = randomFunction[1];

            liriApplication[selectedFunction[0]](searchString);
        });
    },

    runAgain: function() {
        inquirer
        .prompt([ 
        {
            type: 'confirm',
            message: "Would you like to search again?",
            name: "searchAgain"
        },
        ])
        .then(function(inquirerResponse) {
            if (inquirerResponse.searchAgain) {
                liriApplication.askWhichFunction()
            } else {
                console.log("Thank you for using LIRI!")
            }
        });
    },
};

liriApplication.askWhichFunction();