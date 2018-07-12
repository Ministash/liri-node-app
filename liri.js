//read and set any environment variables with the dotenv package
require("dotenv").config();

//All of my variables
const Twitter = require('twitter');
var Spotify = require('node-spotify-api');
const keys = require("./keys.js");
let fs = require("fs");

const userInput = process.argv;
const userInputCommand = userInput[2];
let userSong = userInput[3];



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Start of the program as a whole/////////////////////////////////////////////////////////////////////////////////////////


inputDecider();

//Takes the user input and does something with it. (user input is grabbed from the process.argv[2])
function inputDecider(){
    if(userInputCommand == 'my-tweets'){
        tweetFinder();
    }
    if(userInputCommand == "spotify-this-song"){
        spotifyFinder();
    }
    
}


//Function that handles my twitter NPM package functionality
function tweetFinder(){
    var client = new Twitter({
        consumer_key: keys.twitter.consumer_key,
        consumer_secret: keys.twitter.consumer_secret,
        access_token_key: keys.twitter.access_token_key,
        access_token_secret: keys.twitter.access_token_secret
      });
       
      var params = {screen_name: 'BobRoss30184229'};
      client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {

            for(let i = 0; i < 20; i++){
                console.log(tweets[i].text);
            }
        }
      });
    
}

//Function that handles my spotify NPM package functionality

function spotifyFinder(){
    var spotify = new Spotify({
        id: process.env.SPOTIFY_ID,
        secret: process.env.SPOTIFY_SECRET
      });

      if (!userSong) {
          //If no song is specified, set the songName variable to "The Sign."
          userSong = "The Sign";
      }

      spotify.search({ type: 'track', query: userSong, limit: 5}, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }


        if(userSong == "The Sign"){

            console.log("[THIS IS WHAT THE APPLICATION FOUND]")
            console.log("////////////////////////////////////////////");
            console.log("")
            console.log("This is the artist's song- The Sign");
            console.log("This is the artist's name- Ace Of Base");
            console.log("This is the artist's Album- The Sign (Us Album) [Remastered]");
            console.log("This is that sweet sweet link to actually hear it on spotify- https://open.spotify.com/track/0hrBpAOgrt8RXigk83LLNE?si=06brOhJJSVuqH8D3uku0xQ");
            console.log("")
            console.log("////////////////////////////////////////////");

        }else{
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