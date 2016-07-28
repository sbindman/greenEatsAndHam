//add all of your affirmations here
var text = ('I am Sam Sam I am That Sam-I-am! That Sam-I-am! I do not like That Sam-I-am! Do you like Green eggs and ham? I do not like them,  Sam-I-am I do not like Green eggs and ham  Would you like them Here or there?  I would not like them Here or there I would not like them Anywhere I do not like Green eggs and ham I do not like them  Sam-I-am Would you like them In a house  Would you like them With a mouse  I do not like them In a house I do not like them With a mouse I do not like them Here or there I do not like them Anywhere I do not like green eggs and ham I do not like them, Sam-I-am Would you eat them In a box?  Would you eat them With a fox?  Not in a box Not with a fox Not in a house Not with a mouse I would not eat them here or there I would not eat them anywhere I would not eat green eggs and ham I do not like them, Sam-I-am Would you? Could you? In a car?  Eat them! Eat them! Here they are I would not, could not,  In a car You may like them You will see You may like them In a tree I would not, could not in a tree Not in a car! You let me be I do not like them in a box I do not like them with a fox I do not like them in a house I do not like them with a mouse I do not like them here or there I do not like them anywhere I do not like green eggs and ham I do not like them, Sam-I-am').toLowerCase();

//function to create the markov dictionary
function markovChain(inputText) {
	var words = inputText.split(' ');
	var markov_dict = {};

	var key1=0;
    var key2=1;
    var value=2;

    //loop through words and create dictionary of 2 words (key), with following words (value)
	for (var i=0; i<(words.length - 2); i++) {

		//if key does not exist, add it
        if ( !(markov_dict[words[key1] + ' ' + words[key2]]) ) {
            markov_dict[words[key1] + ' ' +  words[key2]] = []; 
        }
        //otherwise just push new value
        markov_dict[words[key1] + ' ' +  words[key2]].push(words[value]);

        key1 = key1 + 1;
        key2 = key2 + 1;
        value = value + 1;
	}
        
    return markov_dict;
}

//function to build phrase
function buildPhrase(markov_dict) {
	//grab all keys and select a random one
    var allkeys = Object.keys(markov_dict);
    var key = allkeys[Math.floor(Math.random() * allkeys.length)];

    var newtext = key;
    var i = 3;
    var word1 = key.split(' ')[0];
    var word2 = key.split(' ')[1];

	//while key is in dictionary, keep adding     
    while ( markov_dict[word1 + ' ' + word2] && i < 40) {
        i = i + 1;
        var value = markov_dict[word1 + ' ' + word2][Math.floor(Math.random() * markov_dict[word1 + ' ' + word2].length)];
        newtext = newtext + " " + value;
        word1 = word2;
        word2 = value;
    }
         
    return newtext;
}

//jquery for button
$('#affirm').on('click', function() {
	alert(buildPhrase(markovChain(text)));
});


//change color of affirm bar
var i = 1;
//change on interval
var interval = setInterval(function() {

	if (i%3 == 0) {
		$('#affirm').css('background-color', 'white');
        $('#affirm').css('color', '#69D62B');
	}
	else if (i%2 == 0) {
		$('#affirm').css('background-color', '#69D62B');
        $('#affirm').css('color', 'white');
	}

	////turn on to stop flashing
	// if (i >= 20) {
	// 	window.clearInterval(interval);
	// }

	i++;

}, 300);








