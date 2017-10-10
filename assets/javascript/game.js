
// -------------------------------------------------------------------------------
// Setup Global Variables Need to keep wins, words, letters guessed, # of guesses
// -------------------------------------------------------------------------------

var wins = 0;  // holds total # of wins during this game
var loses = 0; // holds total # of loses during this game
var numOfGuesses = 0;  // holds number of guesses for this round
var guessesAllowed = 15;  // holds total number of guesses allowed for each round
var lettersLeft; // holds the number associated w/ the number of letters the user has left to guess
var userInput = "";  // holds the letter the user typed
var wordGuessStatus = []; // "";  // holds the view of what the word looks like after each guess
var lettersGuessed = [];  // holds the letters guessed already for each round

// create array of possible words that user will have to guess
var wordsAvailableToGuess = ["calendar", "blinds", "pictures", "drawing", "schedule", "friends", "buildings", "believe", "artwork", "holidays", "donuts", "ceiling", "caffine", "scissors", "suburban"];
var currentWord = "";  // holds current word that user is guessing

// create an object that sets up the possible user messages displayed during the game
var userMessages = {
    // types of messages w/ values
    chooseLetter: "Please guess a letter.",
    letterWrong: "Try again.",
    letterRight: "Good Job!",
    duplicateLetterWrong: "You already guessed that letter.  Check your letter's guessed and try again.",
    duplicateLetterRight: "You already got that letter right.  Try another letter.",
    almostThere: "Keep trying you are almost there!",
    almostOutGuesses: "Oh no! You are almost out of guesses!",
    youLost: "So sorry you didn't guess it right this time.",
    youWon: "Yay! You won!",

    // check to see if userMessages object methods working properly
    displayAllMsgs: function() {
    	console.log("userMessages loaded");
    	console.log(this.chooseLetter);
    	console.log(this.duplicateLetterWrong);
    	console.log(this.almostThere);
    	console.log(this.almostOutGuesses);
    	console.log(this.youLost);
    	console.log(this.youWon);
    },
};

// userMessages.displayAllMsgs();
console.log("Global Variables Setup");


// setup new game page view ... argument passed signals new game or not
resetGame(true);

// Tell the user to start guessing by typing a letter
writeMessageToUser(userMessages.chooseLetter);

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

	// check to see if user still has guesses left to play with
	if (guessesAllowed > 0) {

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

			wrongLetterCheck(userInput.textContent);
			// if (wrongLetterCheck(userInput.textContent)) {

			// 	console.log("letter already guessed");
			// 	// add letter to letters guessed wrong array
			// 	// decrement guesses counter
			// }

		}
	}
	else {

		// user out of guesses
		// display you lost message ... userMessages.youLost
		writeMessageToUser(userMessages.youLost);

		// setup a new word to let the user play again
		resetGame();

	}

}


// select new word from wordsAvailableToGuess array
function newWordSelector() {

	console.log("newWordSelector function called");

	// reset wordGuessStatus array
	wordGuessStatus = [];

	// Randomly chooses a choice from the wordsAvailableToGuess array. This is the word the user
	// is trying to guess.
	// returns new word selected from the wordsAvailableToGuess array
    return wordsAvailableToGuess[Math.floor(Math.random() * wordsAvailableToGuess.length)];
}

// display new word blanks on screen ... pass in new word from newWordSelector function
function displayNewWord(newWord) {

	console.log("displayNewWord function called with newWord = " + newWord);
	
	// check length of string for newWord
	lettersLeft = newWord.length;
	console.log(lettersLeft);

	// for loop to display each letter of the word (does this need to be put into an array?)
	for (var i = 0; i < lettersLeft; i++) {
        wordGuessStatus[i] = "_";
    }
    console.log(wordGuessStatus);

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

	var letterRightCount = 0;
	var letterIsRight = false;
	var letterAddedAlready = false;

	// console.log("isLetterRight function called with guessedLetter = " + guessedLetter);

	// loop through current guessed letters to see if the guessed letter has already been added to the current word
	for (var j = 0; j < wordGuessStatus.length; j++) {
			
			// check to see if letter is already added to the current word being guessed
			if (wordGuessStatus[j] === guessedLetter) {
				letterAddedAlready = true;
			}
	}

	// check to see if the letter has already been added from the loop check above
	if (letterAddedAlready) { 

		// Tell the user they already got that letter right
		writeMessageToUser(userMessages.duplicateLetterRight);

		// yes they got it right but duplicate letter so we don't need to do anything further in this section
		return true;
	}
	else {

		// loop through current word and check to see if it matches the letter typed
		for (var i = 0; i < currentWord.length; i++) {

			// console.log("currentWord checked " + i + " time");

			if (currentWord.charAt(i) === guessedLetter) { // && !letterAddedAlready

				// console.log("currentWord checked has the guessedLetter in it");

				// if the user guessed a letter right then 
				
				// add 1 to letter right to know whether the letter guessed was right
				letterRightCount++;

				// check to see if the letter has not already been added to the guessed word status
				// if (!letterAddedAlready) {

					// if it hasn't then decrement the letters left counter to test for win
					lettersLeft--;
				// }

				

				// replace the blanks with the guessedLetter
				wordGuessStatus[i] = guessedLetter;
				
				console.log("wordGuessStatus = " + wordGuessStatus);

				// show new letter placement to user in web page using currentWordDisplay element
				document.getElementById("currentWordDisplay").innerHTML = wordGuessStatus;

				// check to see if there are any letters left for the user to guess in the current word
				if (lettersLeft === 0) {

					// the user has guessed all the letters in the word now
					console.log("user Won letters left = " + lettersLeft);

					// call userWon function
					userWonGame();

					// yes the user got the letter right
					return true;

				}
						
			}
			
		}

	}
			// check to see if charAt[i] equals guessedLetter
		// if it does then add it to the display word view and return true

		// if it doesn't then check to see if it has already been guessed ... wrongLetterCheck(guessedLetter)
		
			// if is has already been guessed then display wrong letter message to user
				// return false
			
			// if it hasn't already been guessed 
				// add wrong letter to array
				// display wrong letter array new word to screen
				// return false

	// console.log("letterRightCount = " + letterRightCount);

	// check to see if the user got the letter right
	// if (letterRightCount > 0) {
	if (letterRightCount === 0) {
		
		// // check to see if the letter has already been added from the loop check above
		// if (letterAddedAlready) { 

		// 	// Tell the user they already got that letter right
		// 	writeMessageToUser(userMessages.duplicateLetterRight);

		// 	// yes they got it right but duplicate letter so we don't need to do anything further in this section
		// 	return true;
		// }
		// else {

		// 	// Tell the user they got it right
		// 	writeMessageToUser(userMessages.letterRight);

		// 	// yes the user got the letter right
		// 	return true;
		// }

		// wrongLetterCheck(guessedLetter);

		return false;


	}
	else {
		
		// check to see if the letter has already been guessed
		// wrongLetterCheck(guessedLetter);

		// if (wrongLetterCheck(guessedLetter)) {

		// 	console.log("letter already guessed");
		// 	// add letter to letters guessed wrong array
		// 	// decrement guesses counter
		// }
		// else
		// {

			
		// }
		// // // if the user got the letter wrong
		// // wrongLetterCheck(guessedLetter);

		// return false;	

		// Tell the user they got it right
		writeMessageToUser(userMessages.letterRight);

		return true;
	}

	
}

// wrongLetterCheck function ... checks to see if letter has already been guessed by the user
// returns true is it has or false if it hasn't yet
function wrongLetterCheck(guessedLetter) {

	var isLetterGuessed = false;

	console.log("wrongLetterCheck function called with guessedLetter = " + guessedLetter);

	// check to see if anything already in lettersGuessed array
	if (lettersGuessed.length === 0) {

		// if it hasn't been guessed already add it to the wrong letters array
		lettersGuessed.push(guessedLetter);

		// Tell the user they got it wrong
		writeMessageToUser(userMessages.letterWrong);

		// decrement the # of guesses left
		guessesAllowed--;

		// display new guess count
		document.getElementById("guessesLeftDisplay").innerHTML = guessesAllowed;

		isLetterGuessed = true;

	}
	else
	{
		// loop through lettersGuessed array
		for (var i = 0; i < lettersGuessed.length; i++) {

			console.log("wrongLetterCheck for loop called lettersGuessed length = " + lettersGuessed.length);
	                
	        console.log("wrongLetterCheck for loop called " + i + " times.");
	        // check to see if the guessed letter has already been guessed
			if (lettersGuessed[i] === guessedLetter) {

				// if it has already been guessed display user message
				writeMessageToUser(userMessages.duplicateLetterWrong);

				isLetterGuessed = true;

			}

	    }

	    if (!isLetterGuessed) {

	    	// if it hasn't been guessed already add it to the wrong letters array
			lettersGuessed.push(guessedLetter);

			// Tell the user they got it wrong
			writeMessageToUser(userMessages.letterWrong);

			// decrement the # of guesses left
			guessesAllowed--;

			// display new guess count
			document.getElementById("guessesLeftDisplay").innerHTML = guessesAllowed;

	    }
		
	}

    console.log(lettersGuessed);

	// add blanks to web page in lettersGuessedDisplay element
	document.getElementById("lettersGuessedDisplay").innerHTML = lettersGuessed;

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
	// write message to user in the #userMessage area 
	document.getElementById("userMessage").innerHTML = message;

}

// reset game word to new word on start up and after win or lose
// argument passed shows it if should be a new game reset true or false
function resetGame(newGame) {

		// pick a new word to use for the game
		currentWord = newWordSelector();
		console.log(currentWord);
		// call function to display blanks associated w/ new word selected
		displayNewWord(currentWord);

		// reset guesses back to full amount allowed
		guessesAllowed = 15;  
		// display how many guesses are available to the user
		document.getElementById("guessesLeftDisplay").innerHTML = guessesAllowed;

		// reset lettersGuessed array
		lettersGuessed = [];
		console.log(lettersGuessed);
		// reset web page view for lettersGuessedDisplay element
		document.getElementById("lettersGuessedDisplay").innerHTML = lettersGuessed;

		// check if this is a new game or just a round reset
		if (newGame) {

				// reset win counter to 0
				wins = 0;
				// add new win count to web page view
				document.getElementById("winNum").innerHTML = wins;
		}

}

// user won process
function userWonGame() {

	console.log("userWonGame function executing");
	// write message to user in the #userMessage area 
	document.getElementById("userMessage").innerHTML = userMessages.youWon;

	// add 1 to win counter
	wins++;

	// add new win count to web page view
	document.getElementById("winNum").innerHTML = wins;

	// user won so reset game w/out resetting win counter
	resetGame(false);

}










