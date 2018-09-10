var hangman = {
    wins: 0,
    losses: 0,
    guessesLeft: 10,
    wrongLettersGuessed: [],
    wordToGuess: "",
    wordsPlayed: [],

    startGame: function() {
        // Pick a word for the player to guess.
        this.setRandomWordToGuess();
        this.moveWordToWordsPlayedBucket(this.wordToGuess);

        // Regenerate html for word to guess.
        $(".word-to-guess").html(hangman.generateHTML(this.wordToGuess, letterClassName, true));
        console.log(this.wordToGuess);
        
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
        console.log("Wins: " + this.wins + " | Losses: " + this.losses);
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
        if (!$(".letter").text().includes('_')){
            this.wins++;
            this.startGame();            
        }
        else if (this.guessesLeft === 0){
            this.losses++;
            this.startGame();
        }
    }
}