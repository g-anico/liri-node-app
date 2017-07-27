
var keys = require ('./keys');
var request = require('request');
var fs = require ('fs');

var arg2 = process.argv[2];
var arg3 = process.argv[3];

var spotify = require('spotify');
var Twitter = require ('twitter');
var params = {
	screen_name: 'g_anico',
	count: 20
	}

switch (action) {
	case '' // threw a syntax error due to unfinished switch block.
} 

//get myTweets function
function twitter(handle){
	if (!handle) {
		handle = 'g_anico';
	}
	var client = new Twitter({
		consumer_key: keys.twitterKeys.consumer_key,
		consumer_secret: keys.twitterKeys.consumer_secret,
		access_token_key: keys.twitterKeys.access_token_key,
		access_token_secret: keys.twitterKeys.access_token_secret
	});

	var params = {
		screen_name: handle,
		count: 20
	};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		if(!error) {
			console.log('\n--------------------\n');
			for (var i = 0; i < params.length; i++) {
				console.log('@' + tweets[i].user.screen_name);
				console.log("Tweets: " + tweets[i].text);
				console.log("Created: " + tweets[i].created_at + "\n");
				console.log('\n--------------------\n');
			}
		}
	});
}

//spotifyThis function
function spotify(){
	if(!song) {
		song = 'The Sign';
	};
	spotify.search({type: 'track', query: song}, function(error, data) {
		if(!error) {
			for (var i = 0; i < 10; i++) {
				if (data.tracks.items[i] != undefined) {
					console.log('\n--------------------\n');
					console.log('Artist: ' + data.tracks.items[i].artists[0].name); // threw syntax error here for unecessary `]` 
					console.log('Song: ' + data.tracks.items[i].name);
					console.log('Album: ' + data.tracks.items[i].album.name);
					console.log('Preview URL: ' + data.tracks.items[i].preview_url);
					console.log('\n--------------------\n');

				};
			};
		} else {
			console.log('Error: ' + error);
		};
	});
};

//beginning of omdbThis function
//stores all arguments in an array

function omdb(movie) {
	if (movie == null) {
		movie = 'Mr. Nobody';
	}
	//run a request to omdb api with the movie specified
	var queryURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=40e9cece";
	console.log(queryURL); // to help debug the actual URL
	request(queryURL, function(error, response, body) {
		if (!error && response.statusCode === 200) {
			var json = JSON.parse(body);
			console.log("\n--------------------\n");
			console.log("Title: " + json.Title + "\n");
			console.log("Year: " + json.Year + "\n");
			console.log("IMDB Rating: " + json.imdbRating + "\n");
			console.log("Rotten Tomato Score: " + json.tomatoUserMeter + "\n");
			console.log("Country: " + json.Country + "\n");
			console.log("Language: " + json.Language + "\n");
			console.log("Plot: " + json.Plot + "\n");	
			console.log("Actors: " + json.Actors + "\n");
			console.log("\n--------------------\n");
	} else {
		if(error) throw error; 
	}
});
}

function doWhatIsay() {
	fs.readFile('random.txt', 'utf8', function(error, data) {
		if(error) {
			console.log(error);
		} else {
			var dataArr = data.split(',');
			if (dataArr[0] === 'spotify-this-song') {
				spotifyThis(dataArr[1]);
			}
			if (dataArr[0] === 'omdb') {
				omdbThis(dataArr[1]);
			}
		}
	});
}




