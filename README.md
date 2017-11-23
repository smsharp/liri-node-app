# liri-node-app

## Description

LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI is a command line node app that takes in parameters and gives you back data.

### How to Set Up LIRI

Download the zip file from the repository and unzip. The list of dependecies you will need can be found in package.json. To download them all at once, run the command:

`npm install`

## Running LIRI

Here's a quick list of the commands you can use in LIRI.

### Get Tweets

Retrieves up to your latest 20 tweets:

`node liri.js my-tweets`

### Get Song Info

Retrieves song information for a track:

`node liri.js spotify-this-song "Proudest Monkey"`

### Get Movie Info

Retrieves movie information for a movie:

`node liri.js movie-this "What About Bob"`

### Get Random Info

Gets random text inside a file and does what it says:

`node liri.js do-what-it-says`
