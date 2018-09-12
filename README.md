# Medium Scraper
Simple CasperJS script to scrap followers on Medium.

## Presentation
Script to scrap all the followers' informations from a Medium account and output the list in a JSON file.

You can pick any user on Medium, the script will browse its followers list and collect all the public informations of each of them.

**This script doesn't work with publications.**

## Output
```
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
```

## Walkthrough

**Prerequisites: install casperjs: http://docs.casperjs.org/en/latest/installation.html**

1. Set `var medium` with the username of the profile. 
Example: To scrap the followers of https://medium.com/@jeremybrunet, set `var medium = jeremybrunet` in medium.js (line 7)

2. Open your terminal and run `$ casperjs medium.js`

![Run medium.js in Terminal](https://dl.dropboxusercontent.com/s/sdbj9nx1y7kyby8/Capture%20d%E2%80%99%C3%A9cran%202018-09-12%20%C3%A0%2017.32.57.png)

3. Once the scraping over, a JSON file named after `var medium` will appear in the folder where you ran medium.js.

## Performance
~~36 followers scraped in 9.916 seconds~~
50 followers scraped in 5.603 seconds 🚀

~~1739 followers scraped in 6 minutes and 15 seconds~~
1770 followers scraped in 2 minutes and 24 seconds 🚀🚀

~~37643 followers scraped in 2 hours and 45 minutes~~
37708 followers scraped in 54 minutes and 37 seconds 🚀🚀🚀


## Bonus: How to convert your JSON file to CSV?

1. Install [json2csv](https://www.npmjs.com/package/json2csv).

2. Open your terminal and run 
`$ json2csv -i file.json -f userId,name,username,createdAt,lastPostCreatedAt,imageId,backgroundImageId,bio,twitterScreenName,facebookAccountId,allowNotes,mediumMemberAt,isPartnerProgramEnrolled,type -> file.csv`

## License
[MIT License](https://github.com/DFATPUNK/medium-scraper/blob/master/LICENSE)
