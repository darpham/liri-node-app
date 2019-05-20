// importing required external modules
require("dotenv").config();
var inquirer = require('inquirer');
var fs = require('fs');

// importing api module
var apiCalls = require('./api.js');

// LIRI main application module
var liriApplication = {

    // Main function to inquir user input
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

                // Forwards user's selection into different method to identify the users selected function
                liriApplication.identifyFunction(selectedFunction);
            });
    },

    // Identify the function by parsing and calling the method
    identifyFunction: function(selectedFunction) {

        if (selectedFunction[0] == 'do') {
            // calls do method
            this.do();
        } else {
            // calls the correct method via the parsed function
            this.askWhatSearch(selectedFunction[0])
        };
        
    },

    // Function to create and prompt the user to input the search string
    askWhatSearch: function(selectedFunction) {
        
        // Constructor to create prompt that will be inserted into inquirer function
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
        
        // Creates new prompt object via constructor above
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

        // inquirer functiont to get user search string input
        inquirer
        .prompt([ 
        promptObj,
        ])
        .then(function(inquirerResponse) {

            // Calls correct liri method and passes in the search string
            liriApplication[selectedFunction](inquirerResponse.searchString);
        });
    },

    // liri methods that calls the api module with the search string
    concert: function(searchString) {
        apiCalls.concert(searchString);
    },

    spotify: function(searchString) {
        apiCalls.spotify(searchString);
    },

    movie: function(searchString) {
        apiCalls.movie(searchString);
    },

    // Do function that parses random.txt
    do: function() {
        console.log("Running 'do' function, pulling parameters from random.txt");
        fs.readFile('./random.txt', 'utf8', function(err, data) {
            if (err) throw err;
            var randomFunction = data.split(',');
            var selectedFunction = randomFunction[0].split('-');
            var searchString = randomFunction[1];

            // calls liri method with search string parsed from random.txt
            liriApplication[selectedFunction[0]](searchString);
        });
    },

    // This code not being used atm, future enhancement
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

// Calls main method that initiates this application
liriApplication.askWhichFunction();