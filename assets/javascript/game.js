
// Setup Global Variables Need to keep wins, words, letters guessed, # of guesses
var wins = 0;  // holds total # of wins during this game
var numOfGuesses = 0;  // holds number of guesses for this round
var guessesAllowed = 15;  // holds total number of guesses allowed for each round
var userInput = "";  // holds the letter the user typed
var lettersGuessed = [];  // holds the letters guessed already for each round

// create array of possible words that user will have to guess
var wordsAvailableToGuess = ["calendar", "blinds", "pictures", "drawing", "schedule", "friends", "buildings", "believe", "artwork", "holidays"];
var currentWord = "";  // holds current word that user is guessing


console.log("Global Variables Setup");


// Setup functions needed to get game process going

// select new word
function newWordSelector() {

	console.log("newWordSelector function called");

	// return new word value

}

// display new word blanks on screen ... pass in new word from newWordSelector function
function displayNewWord(newWord) {

	console.log("displayNewWord function called with newWord = " + newWord);

}

// update the win count variable
function updateWinCount() {

	console.log("updateWinCount function called with wins = " + wins);

}

// add the letter guessed to current word on screen (not sure if this function needed??)
// pass in correctLetter as argument
function addLetterGuessedCurrWord(correctLetter) {

	console.log("addLetterGuessedCurrWord function called with correctLetter = " + correctLetter);

}

// Not sure if this function is appropriate or not
// is the letter guessed correct?
// pass letter guessed by user
// return true if letter is part of the current word
function checkLetterGuessed(guessedLetter) {

	console.log("checkLetterGuessed function called with guessedLetter = " + guessedLetter);

	// return true or false if letter part of current word or not
}

// use this to write a new message to the user
	// if they guessed a letter right
	// if they already guessed that letter
	// if they won
	// if they lost
function writeMessageToUser(message) {

	console.log("writeMessageToUser function called with message = " + message);

}

// Let's start by grabbing a reference to the <span> below.
      var userInput = document.getElementById("user-text");
      console.log(userInput);

      // Next, we give JavaScript a function to execute when onkeyup event fires.
      document.onkeyup = function(event) 
      {
        userInput.textContent = event.key;
        console.log(userInput.textContent);










