hangman.startGame();

document.onkeyup = function (event) {

    // Allow user to press any key to start the game.
    if (hangman.gameStopped) {
        if (marvelWords.length == 0) {
            hangman.gameOver();
            return;
        }
        hangman.startGame();
        hangman.gameStopped = false;
        resetResultsBox();
        return;
    }

    // Ensure valid letter is presssed (Only letters contain 'Key' in their code).
    if (event.code.includes("Key")) {
        hangman.checkLetter(event.key);
    }
}

function resetResultsBox() {
    $(".results-col").html('');
}