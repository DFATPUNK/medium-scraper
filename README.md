# Medium Scraper
Simple script written in CasperJS to scrap followers on Medium.

## Presentation
Script made to scrap all the followers' informations from a Medium account.
You can pick any user account on Medium, the script will browse the followers list and collect all the public informations of each follower.

This script doesn't work with publications.

## Output
{
  "userId": "7cad54db04f8",
  "name": "Jérémy Brunet",
  "username": "jeremybrunet",
  "createdAt": 1483956139825,
  "lastPostCreatedAt": 1533560089161,
  "imageId": "1*umLJlc6AK2wwDXI9EGkOEQ.png",
  "backgroundImageId": "",
  "bio": "Former co-founder of Peter 🙈 Trying to hack everything for fun!",
  "twitterScreenName": "dfatpunk",
  "facebookAccountId": "10156686722338442",
  "allowNotes": 1,
  "mediumMemberAt": 1531312606000,
  "isPartnerProgramEnrolled": true,
  "type": "User"
}

## Walkthrough
#### How to get the userId of a Medium Profile?

1. Go to the Medium profile page of the user you would like to scrap.
![My Medium Profile](https://dl.dropboxusercontent.com/s/5z11606707a6y2p/Capture%20d%E2%80%99%C3%A9cran%202018-08-11%20%C3%A0%2014.40.23.png)

2. Open the developer console (Chrome is recommended) and search for `window.__APOLLO_STATE__ = {"User:`
![Spot the userId in the console](https://dl.dropboxusercontent.com/s/xyetbdew9zdd9d8/Capture%20d%E2%80%99%C3%A9cran%202018-08-11%20%C3%A0%2014.50.55.png)

3. Save the value of `"User:"` and modify lines 31 & 34 of medium.js (Don't forget to modify line 28 too!)
![Insert userId in links](https://dl.dropboxusercontent.com/s/1da5y2k2ijzwxue/Capture%20d%E2%80%99%C3%A9cran%202018-08-11%20%C3%A0%2014.57.46.png)

4. Open your terminal and run `$ casperjs medium.js``
![Run medium.js in Terminal](https://dl.dropboxusercontent.com/s/j5bj9yoi2utqq2n/Capture%20d%E2%80%99%C3%A9cran%202018-08-11%20%C3%A0%2015.07.05.png)

5. Once the scraping done, a JSON file (named after the variable line 28) will appear in the same folder of medium.js

## Performance
36 followers scraped in 9.916 seconds
1739 followers scraped in 6 minutes and 15 seconds
37643 followers scraped in 2 hours and 45 minutes

## License
[MIT License](https://github.com/DFATPUNK/medium-scraper/blob/master/LICENSE)
