hangman.startGame();

document.onkeyup = function (event) {
    // Ensure valid letter is presssed (Only letters contain 'Key' in their code).
    if (event.code.includes("Key")){
        hangman.checkLetter(event.key);
    }    
}