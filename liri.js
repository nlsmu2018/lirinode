//pulls in your .env file and adds your keys to nodejs session
require("dotenv").config();

var key = require('./keys.js');
var fs = require('fs');
var result = '';
var command = process.argv[2];
var searchName = process.argv.splice(3).join("-");


function spotify() {
  var spotify = require('spotify');
  var requestType = "Spotify Search";
  
  if (!searchName) {
    searchName = 'I Want it That Way'
  }

  spotify.search({ type: 'track', query: searchName }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
    result = 'Artist: ' + data.tracks.items[0].artists[0].name + '\nSong Name: ' + data.tracks.items[0].name + '\nFrom Album: ' + data.tracks.items[0].album.name + '\nPreview: ' + data.tracks.items[0].preview_url;
    console.log(result);
    appendLog(requestType);

  });

}

function movie() {
  var request = require('request');
  var requestType = "Movie Search";
  
  if(!searchName) {
    searchName = "Mr. Nobody";
  }
  
  request.get('http://www.omdbapi.com/?r=json&tomatoes=true&t=' + searchName, function (error, response, movie) {
    if (!error && response.statusCode == 200) {
      movie = JSON.parse(movie);
      result = movie.Title + '\nYear: ' + movie.Year + '\nIMDB Rating: ' + movie.imdbRating + '\nCountry: ' + movie.Country + '\nLanguage: ' + movie.Language + '\nPlot: ' + movie.Plot + '\nActors: ' + movie.Actors + '\nRotten Tomatoes Rating: ' + movie.tomatoUserRating + '\nRotten Tomatoes URL: ' + movie.tomatoURL;
      
      console.log(result);
      appendLog(requestType);
    }
  })
}

function says() {
  var fs = require('fs');

  fs.readFile('./random.txt', 'utf8', function(error, data) {
    var dataArr = data.split(',');
    command = dataArr[0];
    searchName = dataArr[1];
    switch (command) {
      case "spotify-this-song":
        spotify();
        break;
      case "movie-this":
        movie();
        break;
    }
  });
}

function appendLog(type) {
  fs.appendFile("log.txt", type +  "\n\n" + result + "\n\n------------\n\n", function(err) {
      if(err) {
        return console.log(err);
      }
    });
}


switch (command) {
  case "spotify-this-song":
    spotify();
    break;
  case "movie-this":
    movie();
    break;
  case "do-what-it-says":
    says();
    break;
}

if (!command) {
  console.log("Looks like you dint put in the right command");
}

