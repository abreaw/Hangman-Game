
// Setup Global Variables Need to keep wins, words, letters guessed, # of guesses
var wins = 0;  // holds total # of wins during this game
var numOfGuesses = 0;  // holds number of guesses for this round
var guessesAllowed = 15;  // holds total number of guesses allowed for each round
var userInput = "";  // holds the letter the user typed
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
console.log(currentWord);
// call function to display blanks associated w/ new word selected
displayNewWord(currentWord);
// Tell the user to start guessing by typing a letter


// grab the user input element
userInput = document.getElementById("key-pressed");
console.log(userInput);

// code to execute when key pressed and released by user
document.onkeyup = function(event) 
{
userInput.textContent = event.key;
console.log(userInput.textContent);


}


// Setup functions needed to get game process going

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










