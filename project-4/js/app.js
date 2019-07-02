/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

const startGameButton = document.getElementById("btn__reset");
const game = new Game();


// Starts the game when the button is clicked. Calls a new game object
startGameButton.addEventListener('click', () => {
    game.startGame();
    game.resetGame();
});

// Click event listener for every keyboard key
document.getElementById('qwerty').addEventListener('click', (e) => {
    game.handleInteraction(e.target);
});