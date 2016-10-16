$(document).ready(function(){
	
	/*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);

  	});

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});

/*--- Declare Variables ---*/
var guessCount = 0;
var newGuess;
var randomNumber;
var distanceFromNumber;
var wonGame = false;

/*--- Generate a random number ---*/
var generateNumber = function(){
	randomNumber = Math.floor((Math.random()*101)+1);
	console.log("randomNumber is " +randomNumber);
};

/*--- Clear guess text section ---*/
var clearGuess = function() {
	$("#userGuess").val("").focus();
};


var removePastGuesses = function() {
	$("ul.guessBox li").remove();
};


var guessCountDisplay = function() {
	$("#count").text(guessCount);
};
 
 var AddFeedback = function(feedback) {
	$("#feedback").text(feedback);
 };

var checkTemperature = function() {
	distanceFromNumber = (Math.abs(randomNumber - newGuess));
	if (distanceFromNumber === 0) {
		AddFeedback("You Got It!!!");
		$("#userGuess").val(randomNumber + "!");
		wonGame = true;
	} else if (distanceFromNumber < 2 ) {
		AddFeedback("Scalding!");
	} else if (distanceFromNumber < 4 ) {
		AddFeedback("Very Hot!");
	} else if (distanceFromNumber < 8 ) {
		AddFeedback("Hot!");
	} else if (distanceFromNumber < 13 ) {
		AddFeedback("Warm");
	} else if (distanceFromNumber < 23 ) {
		AddFeedback("Luke Warm");
	} else if (distanceFromNumber < 38 ) {
		AddFeedback("Cool");
	} else if (distanceFromNumber < 54 ) {
		AddFeedback("Cold");
	} else {
		AddFeedback("Ice Cold!");
	}
};


generateNumber();



	$("form").submit(function(event){
	event.preventDefault();
	if (wonGame === false) {
		newGuess = +$("#userGuess").val();
		
		if (newGuess % 1 !== 0 || newGuess > 100 || newGuess < 0) {
			alert("Not a valid number");
			return(false);
		} else {
			event.preventDefault();
			$(".guessBox").append("<li>" +newGuess+ "</li>");
			clearGuess();
			guessCount++;
			guessCountDisplay();
			checkTemperature();
		}
	} else {
		AddFeedback("You won!");
	}

	});

	$(".new").click(function(){
		generateNewNumber(); 
		clearGuess();
		guessCount = 0;
		wonGame = false;
		removePastGuesses();
		guessCountDisplay();
		AddFeedback("Make a guess!");
	});
});
