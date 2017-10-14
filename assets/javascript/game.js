
// -------------------------------------------------------------------------------
// Setup Global Variables Need to keep wins, words, letters guessed, # of guesses
// -------------------------------------------------------------------------------

var validKeys = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var wins = 0;  // holds total # of wins during this game
var losses = 0; // holds total # of loses during this game
var numOfGuesses = 0;  // holds number of guesses for this round
var guessesAllowed = 15;  // holds total number of guesses allowed for each round
var lettersLeft; // holds the number associated w/ the number of letters the user has left to guess
var userInput = "";  // holds the letter the user typed
var wordGuessStatus = []; // "";  // holds the view of what the word looks like after each guess
var lettersGuessed = [];  // holds the letters guessed already for each round

// create array of divs and counter for the hangman drawing to be drawn piece by piece
var hangmanCounter = 0;
var hangmanDivNamesArray = ["head", "body", "rightLeg", "rightFoot", "leftLeg", "leftFoot", "rightArm", "rightHand", "leftArm", "leftHand", "rightEye", "leftEye", "nose", "mouth"];

// create array of possible words that user will have to guess
var wordsAvailableToGuess = ["calendar", "blinds", "pictures", "drawing", "schedule", "friends", "buildings", "believe", "artwork", "holidays", "donuts", "ceiling", "caffine", "scissors", "suburban", "ribbons"];
var currentWord = "";  // holds current word that user is guessing

// create an object that sets up the possible user messages displayed during the game
var userMessages = {
    // types of messages w/ values
    chooseLetter: "Please guess a letter.",
    wrongInput: "Please use letters only as guesses.",
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


// setup new game page view ... argument passed signals new game or not
resetGame(true);

// Tell the user to start guessing by typing a letter
writeMessageToUser(userMessages.chooseLetter);

// grab the user input element
userInput = document.getElementById("key-pressed");

// ---------------------------------------------------
// Setup functions needed to get game process going
// ---------------------------------------------------

// code to execute when key pressed and released by user
document.onkeyup = function(event) 
{
	userInput.textContent = event.key;

	// make key entered lowercase
	var lowercaseInput = userInput.textContent.toLowerCase();
	
	// ---------------------------------------------------
	// statements to process for game flow
	// ---------------------------------------------------

	// check to see if user entered valid Key
	if (isKeyValid(lowercaseInput)) {

		// check to see if the letter the user type is in the current word
		if (!isLetterRight(lowercaseInput)) {

			// if letter is not in the current word handle it as a wrong letter
			wrongLetterCheck(lowercaseInput);
		}
	}
	else {

		// tell user that they can only use letters for guesses
		writeMessageToUser(userMessages.wrongInput);
	}

}

// ---------------------------------------------------
// check to make sure the user entered a valid key to guess
// ---------------------------------------------------
function isKeyValid(keyPressed) {

	var keyValid = false;

	// loop through validKeys array to check if key valid
	for (var i = 0; i < validKeys.length; i++) {
		
		// check to see if key entered is equal to any of the letters in the array
		if (validKeys[i] === keyPressed) {
			keyValid = true;
		}
	}

	return keyValid;
}

// ---------------------------------------------------
// select new word from wordsAvailableToGuess array
// ---------------------------------------------------
function newWordSelector() {

	// reset wordGuessStatus array
	wordGuessStatus = [];

	// Randomly chooses a choice from the wordsAvailableToGuess array. This is the word the user
	// is trying to guess.
	// returns new word selected from the wordsAvailableToGuess array
    return wordsAvailableToGuess[Math.floor(Math.random() * wordsAvailableToGuess.length)];
}

// ---------------------------------------------------
// display new word blanks on screen ... pass in new word from newWordSelector function
// ---------------------------------------------------
function displayNewWord(newWord) {

	// check length of string for newWord
	lettersLeft = newWord.length;
	
	// for loop to display each letter of the word (does this need to be put into an array?)
	for (var i = 0; i < lettersLeft; i++) {
        wordGuessStatus[i] = "_";
    }
    
	// add blanks to web page in currentWordDisplay element
	document.getElementById("currentWordDisplay").innerHTML = wordGuessStatus.join(" ");
	
}

// ---------------------------------------------------
// is the letter guessed correct?
// pass letter guessed by user
// return true if letter is part of the current word ... return false if not part of current word
// ---------------------------------------------------
function isLetterRight(guessedLetter) {

	var letterRightCount = 0;
	var letterIsRight = false;
	var letterAddedAlready = false;

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

			// check to see if letter guessed in current word at this point in for loop
			if (currentWord.charAt(i) === guessedLetter) { 

				// add 1 to letter right to know whether the letter guessed was right
				letterRightCount++;

				// decrement the letters left counter to test for win
				lettersLeft--;
				
				// replace the blanks with the guessedLetter
				wordGuessStatus[i] = guessedLetter;
				
				// show new letter placement to user in web page using currentWordDisplay element
				document.getElementById("currentWordDisplay").innerHTML = wordGuessStatus.join(" ");

				// check to see if there are any letters left for the user to guess in the current word
				if (lettersLeft === 0) {

					// the user has guessed all the letters in the word now
					// call userWon function
					userWonGame();

					// yes the user got the letter right
					return true;

				}
						
			}
			
		}

	}

	// check to see if the user got the letter right
	if (letterRightCount === 0) {
		
		return false;
	}
	else {
		
		// Tell the user they got it right
		writeMessageToUser(userMessages.letterRight);

		return true;
	}
	
}

// ---------------------------------------------------
// wrongLetterCheck function ... checks to see if letter has already been guessed by the user
// returns true is it has or false if it hasn't yet
// ---------------------------------------------------
function wrongLetterCheck(guessedLetter) {

	var isLetterGuessed = false;

	// loop through lettersGuessed array
	for (var i = 0; i < lettersGuessed.length; i++) {

	    // check to see if the guessed letter has already been guessed
		if (lettersGuessed[i] === guessedLetter) {

			// if it has already been guessed display user message
			writeMessageToUser(userMessages.duplicateLetterWrong);

			isLetterGuessed = true;

		}

    }

	// check to see if letter was guessed already or not
	if (!isLetterGuessed) {

		// if it hasn't been guessed already add it to the wrong letters array
		lettersGuessed.push(guessedLetter);

		// Tell the user they got it wrong
		writeMessageToUser(userMessages.letterWrong);

		// decrement the # of guesses left
		guessesAllowed--;

		// check to see if user has used up all the guesses already
		if (guessesAllowed === 0) {

			// user out of guesses and game should reset and process loss
			userLostGame();
		}
		else {

			// display new guess count
			document.getElementById("guessesLeftDisplay").innerHTML = guessesAllowed;

			// add blanks to web page in lettersGuessedDisplay element
			document.getElementById("lettersGuessedDisplay").innerHTML = lettersGuessed;

			// -----------------------------------------------------------------------------
			// show a piece of the hangman arrary here and increase index counter (if the letter hasn't already been guessed)
			// -----------------------------------------------------------------------------
			var hangmanPiece = document.getElementById(hangmanDivNamesArray[hangmanCounter]);
			hangmanPiece.style.visibility = "visible";
			hangmanCounter++;

		}

	}

}


// -----------------------------------------------------------------------------
// use this to write a new message to the user
// if they guessed a letter right
// if they already guessed that letter
// if they won
// if they lost
// -----------------------------------------------------------------------------
function writeMessageToUser(message) {

	// write message to user in the #userMessage area 
	document.getElementById("userMessage").innerHTML = message;

}

// -----------------------------------------------------------------------------
// reset game word to new word on start up and after win or lose
// argument passed shows it if should be a new game reset true or false
// -----------------------------------------------------------------------------
function resetGame(newGame) {

		// pick a new word to use for the game
		currentWord = newWordSelector();

		// call function to display blanks associated w/ new word selected
		displayNewWord(currentWord);

		// reset guesses back to full amount allowed
		guessesAllowed = 15;  
		// display how many guesses are available to the user
		document.getElementById("guessesLeftDisplay").innerHTML = guessesAllowed;

		// reset lettersGuessed array
		lettersGuessed = [];

		// reset web page view for lettersGuessedDisplay element
		document.getElementById("lettersGuessedDisplay").innerHTML = lettersGuessed;

		// reset web page view for key-pressed element
		document.getElementById("key-pressed").innerHTML = "";

		// -----------------------------------------------------------------------------
		// reset hangman arrary & counter here ... for loop needed to set all attributes to hidden
		// -----------------------------------------------------------------------------
		hangmanCounter = 0;

		for (var i = 0; i < hangmanDivNamesArray.length; i++) {
			var resetHangmanPieces = document.getElementById(hangmanDivNamesArray[i]);
			resetHangmanPieces.style.visibility = "hidden";
		}

		// check if this is a new game or just a round reset
		if (newGame) {

				// reset win/loss counters to 0
				wins = 0;
				losses = 0;

				// add new win / loss count to web page view
				document.getElementById("winNum").innerHTML = wins;
				document.getElementById("lossNum").innerHTML = losses;
		}

}

// -----------------------------------------------------------------------------
// user won process
// -----------------------------------------------------------------------------
function userWonGame() {

	// write message to user in the #userMessage area 
	document.getElementById("userMessage").innerHTML = userMessages.youWon;

	// add 1 to win counter
	wins++;

	// add new win count to web page view
	document.getElementById("winNum").innerHTML = wins;

	// user won so reset game w/out resetting win counter
	resetGame(false);

}

// -----------------------------------------------------------------------------
// user lost process
// -----------------------------------------------------------------------------
function userLostGame() {

	// display you lost message ... userMessages.youLost
	writeMessageToUser(userMessages.youLost);

	// increment loss counter
	losses++;

	// add new loss count to web page view
	document.getElementById("lossNum").innerHTML = losses;

	// setup a new word to let the user play again
	resetGame(false);

}









