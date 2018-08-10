/**************************************************
Copyright 2018, Jérémy Brunet, All rights reserved.
***************************************************/

/* PREREQUISITE: HOW TO FIND THE USER ID ON MEDIUM */

/*
** 1. Go to the Medium Profile you'd like to scrap
** 2. Open your browser console (Chrome is recommended)
** 3. Search in the source code: 
**
**                window.__APOLLO_STATE__ = {"User: 
**
** 4. Save the serie of digits and letters assigned to "User".
*/

/* PROFILE READY FOR SCRAPING */

/*
** Medium: medium.com/@jeremybrunet
** User_ID: 7cad54db04f8
*/

var casper = require('casper').create();
var fs = require('fs');

var medium = "Jeremy-Brunet";

// URL: https://medium.com/_/api/users/[USER_ID]/followers
var urlFirst = "https://medium.com/_/api/users/7cad54db04f8/followers";

// URL: https://medium.com/_/api/users/[USER_ID]/profile/stream?limit=8&to=
var urlStart = "https://medium.com/_/api/users/7cad54db04f8/profile/stream?limit=8&to=";
var urlEnd = "&source=followers";

var userLimit;
var nextURL;

var user_id;
var user;
var users = [];

var data;
var json;

var s;
var e;
var total_time;
var total_users = 0;

var checkNext = true;

function Scraper() {

    if (!checkNext) { return; }

    casper.wait(1000, function(){

        // Get page content
        data = casper.getPageContent();

        // Get rid off the 16 first characters
        data = data.slice(16);

        // Parse content into JSON
        json = JSON.parse(data);

        // Find users & store their infos in medium.json
        user = json.payload.references.User;

        // How many users in this batch?
        if (Object.keys(json.payload.references).length !== 0) {
            var objLen = Object.keys(user).length;

            // Iterate to push every user in the array
            for (var i = 0; i < objLen; i++) {
                user_id = Object.keys(user)[i];
                users.push(user[user_id]);
            }
        }

        // Write users in the JSON File
        fs.write(medium + '.json', JSON.stringify(users), 'w');

        // Check next user limit
        userLimit = json.payload.paging.next.to;

        if (userLimit == null) {
            checkNext = false;
        }

        // Build next URL to scrap
        nextURL = urlStart + userLimit + urlEnd;

        // Open the next URL
        casper.thenOpen(nextURL, function(){
            if (checkNext) {
                casper.echo("+" + objLen + " followers!", "INFO");
                total_users += objLen;
            } else {
                console.log("Scraping Over!");
                e = new Date().getTime();
                total_time = (e - s) / 1000;
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
    });
    casper.then(Scraper);
}

casper.start(urlFirst, function() {
    s = new Date().getTime();
});

casper.then(Scraper);

casper.run();