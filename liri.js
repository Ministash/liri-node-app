//read and set any environment variables with the dotenv package
require("dotenv").config();

const twitter = require('twitter');
const keys = require("./keys.js");
const userInput = process.argv;
const userInputCommand = userInput[2];

inputDecider();

function inputDecider(){
    if(userInputCommand === 'my-tweets'){
        console.log('hunter haak')
    }

}



// function tweetFinder(){

// }