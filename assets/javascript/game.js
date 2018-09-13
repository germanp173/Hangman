var hangman = {
    wins: 0,
    losses: 0,
    guessesLeft: 10,
    wrongLettersGuessed: [],
    wordToGuess: "",
    wordsPlayed: [],
    gameStopped: false,

    startGame: function() {
        // Pick a word for the player to guess.
        this.setRandomWordToGuess();
        this.moveWordToWordsPlayedBucket(this.wordToGuess);

        // Regenerate html for word to guess.
        $(".word-to-guess").html(hangman.generateHTML(this.wordToGuess, letterClassName, true));
        
        // Reset key functionality.
        this.guessesLeft = 10;
        this.wrongLettersGuessed = [];
        $("#counter").text(this.guessesLeft);
        $(".wrong-letters").html('');
    },

    setRandomWordToGuess: function() {
        var randomIndex = Math.floor(Math.random() * marvelWords.length);
        this.wordToGuess = marvelWords[randomIndex];
    },

    moveWordToWordsPlayedBucket: function(word){
        // This method moves a word from the marvel words
        // bucket to the words played bucket to ensure they
        // don't get repeated during the game.
        var wordIndex = marvelWords.indexOf(word);
        if (wordIndex > -1){
            marvelWords.splice(wordIndex, 1);
            this.wordsPlayed.push(word);
        }
    },

    generateHTML: function(content, className, hideContent){
        var html = "";

        for (var i = 0; i < content.length; i++){
            if (content[i] === ' '){
                html += "<span class=" + spaceClassName  + "></span>";
            }
            else{
                html += "<p class=" + className + ">" + (hideContent ? "__" : content[i]) + "</p>";
            }
        }
        return html;
    },

    checkLetter: function(letter){
        var word = this.wordToGuess.toUpperCase();        
        var letter = letter.toUpperCase();

        // Ensure you haven't already guessed that letter
        if (this.wrongLettersGuessed.includes(letter)){
            return;
        }

        // Check whether the correct letter was guessed
        if (word.includes(letter)){
            this.showFoundLetter(letter);
        }
        else{
            this.wrongLettersGuessed.push(letter);
            this.guessesLeft--;
            $("#counter").text(this.guessesLeft);
            $(".wrong-letters").html(this.generateHTML(this.wrongLettersGuessed, wrongLetterClassName, false))
        }

        this.evaluateStateOfGame();
    },

    showFoundLetter: function(letter) {
        // Removes all empty spaces from word to guess
        // This is necessary since the indexes from the word have to 
        // match the indexes of "letter" P elements (which don't includes empty spaces).
        var word = this.wordToGuess.replace(/\s/g, '').toUpperCase(); 
        var letter = letter.toUpperCase();
        
        for (var i = 0; i < word.length; i++){
            if (word[i] === letter){
                $(".letter").eq(i).text(letter);
            }
        }
    },

    evaluateStateOfGame: function() {
        // Evaluate whether the player won, loss or the game is still being played.
        if (!$(".letter").text().includes('_')){
            this.wins++;            
            this.updateUI(true);
        }
        else if (this.guessesLeft === 0){
            this.losses++;
            this.updateUI(false);
        }
    },
    
    updateUI: function(won){
        this.gameStopped = true;
        var gameResults = $("<div>").addClass("game-results");
        
        if (won){
            gameResults.html("<h3>You Won! <i class='fas fa-laugh-beam'</i></h3>");
        }
        else{
            gameResults.html("<h3>You Loss! <i class='fas fa-sad-tear'</i></h3>");
            gameResults.append($("<p>").html("The character was: <b>" + hangman.wordToGuess.toUpperCase() + "</b>"));
        }

        gameResults.append($("<p>").text("Press any key to play again"));
        this.addWordToListOfWordsPlayed();

        // Set game results column.
        $(".results-col").html(gameResults);

        // Update Score and words played
        $("#total-wins").text(hangman.wins);
        $("#total-losses").text(hangman.losses);

        // Update background and sound.
        document.body.style.backgroundImage = marvelObjects[this.wordToGuess].image;
    },

    addWordToListOfWordsPlayed: function(){
        $(".words-played-list").append($("<p>").text(this.wordToGuess)).append($("<span>").addClass(spaceClassName));
    },

    gameOver: function() {
        var gameResults = $("<div>").addClass("game-results");
        gameResults.html("<h3>No more words left! <i class='fas fa-flushed'</i></h3>");
        gameResults.append($("<p>").text("Refresh the page to start over"));
        $(".results-col").html(gameResults);
    }
}