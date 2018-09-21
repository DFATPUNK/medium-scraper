// Copyright 2018, Jérémy Brunet, All rights reserved.

var casper = require('casper').create();
var fs = require('fs');

// Set var medium with the profile's username -> https://medium.com/@jeremybrunet
var medium = "jeremybrunet";
var medium_id;

// Variables to store and count the followers
var users = [];
var total_users = 0;

// Create JSON to parse data
var json;

// Variables to measure running time
var s;
var e;

// Variable to check if we have reached or not the last batch of followers
var checkNext = true;

// Function to parse JSON data
function Parser() {

    // Get page content, get rid off the 16 first characters & parse JSON data
    var data = casper.getPageContent().slice(16);
    json = JSON.parse(data);
}

// Function to scrap followers
function Scraper() {

    if (!checkNext) { 
        return; 
    } else {

        Parser();

        // Find users & store their infos in medium.json
        var user = json.payload.references.User;

        // How many users in this batch?
        if (Object.keys(json.payload.references).length !== 0) {
            var objLen = Object.keys(user).length;

            // Iterate to push every user in the array
            for (var i = 0; i < objLen; i++) {
                var user_id = Object.keys(user)[i];
                users.push(user[user_id]);
            }
        }

        // Write users in the JSON File
        fs.write(medium + '.json', JSON.stringify(users, undefined, 2), 'w');

        // Check next user limit
        var userLimit = json.payload.paging.next.to;

        if (userLimit == null) {
            checkNext = false;
        }

        // Build next URL to scrap
        var nextURL = "https://medium.com/_/api/users/" + medium_id + "/profile/stream?limit=8&to=" + userLimit + "&source=followers";

        // Open the next URL
        casper.thenOpen(nextURL, function(){
            if (checkNext) {
                casper.echo("+" + objLen + " followers!", "INFO");
                total_users += objLen;
            } else {
                console.log("Scraping Over!");
                
                // Save the ending time
                e = new Date().getTime();
                var total_time = (e - s) / 1000;
                if (total_time < 60) {
                    casper.echo(total_users + " followers scraped in: " + total_time + "s!","INFO");
                } else if (total_time < 3600) {
                    total_time /= 60;
                    casper.echo(total_users + " followers scraped in: " + total_time + "min!","INFO");
                } else {
                    total_time /= 3600;
                    casper.echo(total_users + " followers scraped in: " + total_time + "hrs!","INFO");
                }
            }

        });
    };
    casper.then(Scraper);
}

casper.start("https://medium.com/@" + medium + "?format=json", function() {
    
    // Save the starting time
    s = new Date().getTime();

    Parser();
    
    // Fetch username of the medium account
    medium_id = json.payload.user.userId;

    // Open the first batch of followers to scrap
    casper.thenOpen("https://medium.com/_/api/users/" + medium_id + "/followers");
});

// Recursive scraping
casper.then(Scraper);

casper.run();
