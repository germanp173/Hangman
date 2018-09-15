hangman.startGame();

document.onkeyup = function (event) {

    // Ensure audio is playing (Can only be played after the user interacts with the site)
    var audio = document.getElementById("audio-element");
    if (audio.paused){
        audio.play();
    }

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