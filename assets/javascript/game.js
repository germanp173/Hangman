var letterClassName = "letter";
var spaceClassName = "space";

var hangman = {
    wins: 0,
    losses: 0,
    guesses: 10,
    wrongLettersGuessed: [],
    wordToGuess: "",
    wordsPlayed: [],
    marvelWords: [
        "Inifinity Stones", "Iron Man", "Thor",
        "Jarvis",
        "Wakanda",
        "Vibranium",
        "Black Panther",
        "TChalla",
        "Killmonger",
        "Captain America",
        "Winter Soldier",
        "Shield",
        "Black Widow",
        "Spiderman",
        "Doctor Strange"
    ],

    startGame: function() {
        // Pick a word for the player to guess.
        this.setRandomWordToGuess();
        this.moveWordToWordsPlayedBucket(this.wordToGuess);

        // Regenerate html for word to guess.
        $(".word-to-guess").html(hangman.generateHTMLFromWordToGuess());
        console.log(this.wordToGuess);
        
        // Reset key properties
        this.guesses = 10;
        this.wrongLettersGuessed = [];
    },

    setRandomWordToGuess: function() {
        var randomIndex = Math.floor(Math.random() * this.marvelWords.length);
        this.wordToGuess = this.marvelWords[randomIndex];
    },

    moveWordToWordsPlayedBucket: function(word){
        // This method moves a word from the marvel words
        // bucket to the words played bucket to ensure they
        // don't get repeated during the game.
        var wordIndex = this.marvelWords.indexOf(word);
        if (wordIndex > -1){
            this.marvelWords.splice(wordIndex, 1);
            this.wordsPlayed.push(word);
        }
    },

    generateHTMLFromWordToGuess: function(){
        var html = "";

        for (var i = 0; i < this.wordToGuess.length; i++){
            if (this.wordToGuess[i] === ' '){
                html += "<span class=" + spaceClassName  + "></span>";
            }
            else{
                html += "<p class=" + letterClassName + ">__</p>";
            }
        }
        return html;
    },

    checkLetter: function(letter){

        var word = this.wordToGuess.toUpperCase();        
        var letter = letter.toUpperCase();

        // Ensure you haven't already guessed that letter
        if (this.wrongLettersGuessed.includes(letter)){
            console.log("You already guessed that letter");
            return;
        }

        // Check whether the correct letter was guessed
        if (word.includes(letter)){
            this.showFoundLetter(letter);
        }
        else{
            this.wrongLettersGuessed.push(letter);
            this.guesses--;
            console.log(this.wrongLettersGuessed);
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
        else if (this.guesses === 0){
            this.losses++;
            this.startGame();
        }
    }
}

hangman.startGame();

document.onkeyup = function (event) {
    // Ensure valid letter is presssed (Only letters contain 'Key' in their code).
    if (event.code.includes("Key")){
        hangman.checkLetter(event.key);
    }    
}