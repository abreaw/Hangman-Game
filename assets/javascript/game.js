
// -------------------------------------------------------------------------------
// Setup Global Variables Need to keep wins, words, letters guessed, # of guesses
// -------------------------------------------------------------------------------

var wins = 0;  // holds total # of wins during this game
var numOfGuesses = 0;  // holds number of guesses for this round
var guessesAllowed = 15;  // holds total number of guesses allowed for each round
var userInput = "";  // holds the letter the user typed
var wordGuessStatus = "";  // holds the view of what the word looks like after each guess
var lettersGuessed = [];  // holds the letters guessed already for each round

// create array of possible words that user will have to guess
var wordsAvailableToGuess = ["calendar", "blinds", "pictures", "drawing", "schedule", "friends", "buildings", "believe", "artwork", "holidays"];
var currentWord = "";  // holds current word that user is guessing

// create an object that sets up the possible user messages displayed during the game
var userMessages = {
    // types of messages w/ values
    chooseLetter: "Please guess a letter.",
    letterWrong: "Try again.",
    duplicateLetter: "You already guessed that letter.  Check your letter's guessed and try again.",
    almostThere: "Keep trying you are almost there!",
    almostOutGuesses: "Oh no! You are almost out of guesses!",
    youLost: "So sorry you didn't guess it right this time.",
    youWon: "Yay! You won!",

    // check to see if userMessages object methods working properly
    displayAllMsgs: function() {
    	console.log("userMessages loaded");
    	console.log(this.chooseLetter);
    	console.log(this.duplicateLetter);
    	console.log(this.almostThere);
    	console.log(this.almostOutGuesses);
    	console.log(this.youLost);
    	console.log(this.youWon);
    },
};

// userMessages.displayAllMsgs();
console.log("Global Variables Setup");


// setup new game view ... ??might could put these into one function??
// call function to select a new word
currentWord = newWordSelector();
// console.log(currentWord);
// call function to display blanks associated w/ new word selected
displayNewWord(currentWord);
// Tell the user to start guessing by typing a letter


// grab the user input element
userInput = document.getElementById("key-pressed");
console.log(userInput);

// ---------------------------------------------------
// Setup functions needed to get game process going
// ---------------------------------------------------

// code to execute when key pressed and released by user
document.onkeyup = function(event) 
{
	userInput.textContent = event.key;
	console.log(userInput.textContent);

	// ---------------------------------------------------
	// need to put statements to check letter pressed for game flow
	// ---------------------------------------------------

	// check to see if the letter the user type is in the current word
	if (isLetterRight(userInput.textContent)) {

		console.log("letter guessed right");

		// if it does then update current word w/ new letter guessed
		addRightLetterGuessed();
		// check to see if word fully guessed (check letter added to current word increment? 
		// or check to see if display word equals current word)

	}
	else {

		console.log("letter guessed wrong");
		if (isLetterGuessed(userInput.textContent)) {

			console.log("letter already guessed");
			// add letter to letters guessed wrong array
			// decrement guesses counter
		}
		

	}

}


// select new word from wordsAvailableToGuess array
function newWordSelector() {

	console.log("newWordSelector function called");

	// Randomly chooses a choice from the wordsAvailableToGuess array. This is the word the user
	// is trying to guess.
	// returns new word selected from the wordsAvailableToGuess array
    return wordsAvailableToGuess[Math.floor(Math.random() * wordsAvailableToGuess.length)];
}

// display new word blanks on screen ... pass in new word from newWordSelector function
function displayNewWord(newWord) {

	console.log("displayNewWord function called with newWord = " + newWord);
	
	// check length of string for newWord
	var wordLength = newWord.length;
	// console.log(wordLength);

	// for loop to display each letter of the word (does this need to be put into an array?)
	for (var i = 0; i < wordLength; i++) {
        wordGuessStatus = wordGuessStatus + "_ ";
    }
    // console.log(wordGuessStatus);

	// add blanks to web page in currentWordDisplay element
	document.getElementById("currentWordDisplay").innerHTML = wordGuessStatus;
}

// update the win count variable
function updateWinCount() {

	console.log("updateWinCount function called with wins = " + wins);

}

// add the letter guessed to current word on screen (not sure if this function needed??)
// pass in correctLetter as argument
function addRightLetterGuessed(correctLetter) {

	console.log("addRightLetterGuessed function called with correctLetter = " + correctLetter);

}

// Not sure if this function is appropriate or not
// is the letter guessed correct?
// pass letter guessed by user
// return true if letter is part of the current word ... return false if not part of current word
function isLetterRight(guessedLetter) {

	console.log("isLetterRight function called with guessedLetter = " + guessedLetter);

	// loop through current word and check to see if it matches the letter typed
	for (var i = 0; i < currentWord.length; i++) {
		console.log("currentWord checked " + i + " time");
		// check to see if charAt[i] equals guessedLetter
		// if it does then add it to the display word view and return true

		// if it doesn't then check to see if it has already been guessed ... isLetterGuessed(guessedLetter)
		
			// if is has already been guessed then display wrong letter message to user
				// return false
			
			// if it hasn't already been guessed 
				// add wrong letter to array
				// display wrong letter array new word to screen
				// return false
	}

	// return true or false if letter part of current word or not
	return false;
}

// isLetterGuessed function ... checks to see if letter has already been guessed by the user
// returns true is it has or false if it hasn't yet
function isLetterGuessed(guessedLetter) {

	console.log("isLetterGuessed function called with guessedLetter = " + guessedLetter);

	// return true or false if letter has already been guessed
	return true;

}

// use this to write a new message to the user
	// if they guessed a letter right
	// if they already guessed that letter
	// if they won
	// if they lost
function writeMessageToUser(message) {

	console.log("writeMessageToUser function called with message = " + message);

}










