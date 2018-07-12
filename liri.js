//read and set any environment variables with the dotenv package
require("dotenv").config();

//All of my variables
const Twitter = require('twitter');
const keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var fs = require("fs");
var request = require("request");

const userInput = process.argv;
const userInputCommand = userInput[2];
let userSong = '';
let userMovie = '';



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Start of the program as a whole/////////////////////////////////////////////////////////////////////////////////////////


inputDecider(userInputCommand);

//Takes the user input and does something with it. (user input is grabbed from the process.argv[2])
function inputDecider(userInputCommand) {
    switch (userInputCommand) {
        case 'my-tweets':
            tweetFinder();
            break;
        case "spotify-this-song":
            userSong = userInput[3];
            spotifyFinder(userSong);
            break;
        case "movie-this":
            userMovie = userInput[3];
            movieFinder(userMovie);
            break;
        case "do-what-it-says":
            doWhatItSaysFunction();
            break;

    }
}


//Function that handles my twitter NPM package functionality
function tweetFinder() {
    var client = new Twitter({
        consumer_key: keys.twitter.consumer_key,
        consumer_secret: keys.twitter.consumer_secret,
        access_token_key: keys.twitter.access_token_key,
        access_token_secret: keys.twitter.access_token_secret
    });

    var params = { screen_name: 'BobRoss30184229' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {

            for (let i = 0; i < 20; i++) {
                console.log(tweets[i].text);
            }
        }
    });

}

//Function that handles my spotify NPM package functionality

function spotifyFinder(userSong) {
    var spotify = new Spotify({
        id: process.env.SPOTIFY_ID,
        secret: process.env.SPOTIFY_SECRET
    });

    if (!userSong) {
        //If no song is specified, set the songName variable to "The Sign."
        userSong = "The Sign";
        console.log("[BECAUSE A SONG WAS NOT PICKED, THE NODE OVERLORDS PICKED A SONG FOR YOU]")
    }

    spotify.search({ type: 'track', query: userSong, limit: 5 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }


        if (userSong == "The Sign") {

            console.log("[THIS IS WHAT THE APPLICATION FOUND*]")
            console.log("////////////////////////////////////////////");
            console.log("")
            console.log("This is the artist's song- The Sign");
            console.log("This is the artist's name- Ace Of Base");
            console.log("This is the artist's Album- The Sign (Us Album) [Remastered]");
            console.log("This is that sweet sweet link to actually hear it on spotify- https://open.spotify.com/track/0hrBpAOgrt8RXigk83LLNE?si=06brOhJJSVuqH8D3uku0xQ");
            console.log("")
            console.log("////////////////////////////////////////////");

        } else {
            let artist = data.tracks.items[1].artists[0].name;
            let songName = data.tracks.items[0].name;
            let album = data.tracks.items[0].album.name;
            let songLink = data.tracks.items[0].external_urls.spotify;

            console.log("[THIS IS WHAT THE APPLICATION FOUND]")
            console.log("////////////////////////////////////////////");
            console.log("")
            console.log("This is the artist's song- " + songName);
            console.log("This is the artist's name- " + artist);
            console.log("This is the artist's Album- " + album);
            console.log("This is that sweet sweet link to actually hear it on spotify- " + songLink);
            console.log("")
            console.log("////////////////////////////////////////////");

        }
    });
}


function movieFinder(userMovie) {

    if (!userMovie) {

        userMovie = "Mr. Nobody"
        console.log("[BECAUSE A MOVIE WAS NOT PICKED, THE NODE OVERLORDS PICKED A MOVIE FOR YOU]")

    }

    request("http://www.omdbapi.com/?t=" + userMovie + "&y=&plot=short&apikey=trilogy", function (error, response, body) {

        if (!error && response.statusCode === 200) {

            let movieName = JSON.parse(body).Title;
            let movieYear = JSON.parse(body).Released;
            let movieRating = JSON.parse(body).imdbRating;
            let movieTomatoesRating = JSON.parse(body).Ratings[1];
            let movieCountry = JSON.parse(body).Country;
            let movieLanguage = JSON.parse(body).Language;
            let moviePlot = JSON.parse(body).Plot;
            let movieActors = JSON.parse(body).Actors;

            console.log("[THIS IS WHAT THE APPLICATION FOUND]")
            console.log("////////////////////////////////////////////");
            console.log("")
            console.log("This is the title of the movie - " + movieName);
            console.log("This is the year the movie came out - " + movieYear);
            console.log("This is the IMDB Rating of the movie - " + movieRating);
            console.log("This is the rotten tomatoes rating of the movie - " + movieTomatoesRating);
            console.log("This is the country where the movie was produced - " + movieCountry);
            console.log("This is the language of the movie - " + movieLanguage);
            console.log("This is the plot of the movie - " + moviePlot);
            console.log("These are the actors in the movie - " + movieActors);
            console.log("")
            console.log("////////////////////////////////////////////");

        }
    });

}

function doWhatItSaysFunction() {

    fs.readFile("random.txt", "utf8", function (error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }

        var dataArr = data.split(",");

        let txtInformation = dataArr;

        console.log("[THE RANDON.TXT FILE FOUND THE COMMAND, 'I WANT IT THAT WAY']");

        spotifyFinder(txtInformation[1])


    });


}