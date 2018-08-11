require("dotenv").config();

// pulls in exports.spotify
var keys = require("./keys.js");

var Spotify = require("node-spotify-api");

var spotify = new Spotify(keys.spotify);

function spotSong(songName){
   spotify
    .search({ type: 'track', query: songName })
    .then(function(response) {
      var songs = response.tracks.items;
       console.log(songs)
    })
    .catch(function(err) {
      console.log(err);
    });
   }

var songTitle = "";
for(var i = 2; i < process.argv.length; i++){
	songTitle += " " + process.argv[i]
}
spotSong(songTitle)