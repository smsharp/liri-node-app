//Loading modules
var fs = require('fs');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var omdb = require('omdb');
var request = require('request');

var input1 = process.argv[2];
var input2 = process.argv.splice(3).join(" ");

var keys = require('./keys.js');

var client = new Twitter(keys.twitterKeys);
var spotify = new Spotify(keys.spotifyKeys);

var params = {
    screen_name: 'pardalily',
    count: 20
};

//Function to process input commands
retrieve();

function retrieve() {
	//Begin Twitter search
    if (input1 === "my-tweets") {

        client.get('statuses/user_timeline', params, function(error, tweets, response) {
            if (!error) {
                console.log('');
                console.log('My Last 20 Tweets: ');
                console.log('--------------------------');
                tweets.forEach(function(individualTweet) {
                    console.log('Time Posted: ' + individualTweet.created_at);
                    console.log('Tweet: ' + individualTweet.text);
                    console.log('--------------------------');

                    fs.appendFile('log.txt', '@pardalily: ' + individualTweet.created_at + ', Tweet: ' + individualTweet.text + '; ');
                });

            } else {
                console.log(error);
            };
        });

    } 	//Begin Spotify song search
		else if (input1 === "spotify-this-song") {

        if (input2.length < 1) {

            input2 = "The Sign Ace of Base";
        };

       	spotify.search({ type: 'track', query: input2 }, function(err, data) {
            if (err) {
                console.log('Error occurred: ' + err);
                return;
            }
            //Log song info
            console.log('');
            console.log('Spotify Song Information Results: ');
            console.log('--------------------------');
            console.log("Artist(s): " + data.tracks.items[0].artists[0].name);
            console.log("Song Title: " + data.tracks.items[0].name);
            console.log("Link to Song: " + data.tracks.items[0].preview_url);
            console.log("Album Title: " + data.tracks.items[0].album.name);
            console.log('--------------------------');

            fs.appendFile('log.txt','Spotify Song Information Results: ' + data.tracks.items[0].artists[0].name + ', ' + data.tracks.items[0].name + ', ' + data.tracks.items[0].preview_url + ', ' + data.tracks.items[0].album.name + '; ');
        });

    } 	//Begin OMDB movie search
    	else if (input1 === "movie-this") {

        if (input2.length < 1) {

            input2 = "Mr. Nobody";
        };

        //Run a request to the OMDB API with the movie specified
        request("http://www.omdbapi.com/?t=" + input2 + "&y=&plot=short&apikey=40e9cece", function(error, response, body) {

            // If the request is successful
            if (!error && response.statusCode === 200) {

            	//Log the movie info
                console.log('');
                console.log('OMDB Movie Information: ');
                console.log('--------------------------');
                console.log("Movie Title: " + JSON.parse(body).Title);
                console.log("Year of Release: " + JSON.parse(body).Year);
                console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
                console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
                console.log("Country produced in: " + JSON.parse(body).Country);
                console.log("Language: " + JSON.parse(body).Language);
                console.log("Movie Plot: " + JSON.parse(body).Plot);
                console.log("Actor(s): " + JSON.parse(body).Actors);
                console.log('--------------------------');

                fs.appendFile('log.txt', 'OMDB Movie Information: ' + JSON.parse(body).Title + ', Year of Release: ' + JSON.parse(body).Year + ', IMDB Rating: ' + JSON.parse(body).imdbRating + ', Rotten Tomatoes Rating: ' + JSON.parse(body).Ratings[1].Value + ', Country produced in: ' + JSON.parse(body).Country + ', Language: ' + JSON.parse(body).Language + ', Movie Plot: ' + JSON.parse(body).Plot + ', Actor(s): ' + JSON.parse(body).Actors + '; ');

            } else {

                console.log(error);
            }
        });

    } else if (input1 === "do-what-it-says") {

       	fs.readFile('random.txt', 'utf8', function(err, data) {
            if (err) throw err;

            var arr = data.split(',');

            input1 = arr[0].trim();
            input2 = arr[1].trim();
            retrieve();

        });
    }
};
