/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */
class Game {
    constructor() {
        this.missed = 0;
         this.phrases = this.createPhrases();
        this.activePhrase = this.getRandomPhrase();
        }
        
        createPhrases(){
            const phrases = 
            [
            new Phrase("Change the world be being yourself "),
            new Phrase("And still i rise"),
            new Phrase("Strive for greatness"),
            new Phrase("Positive change"),
            new Phrase("Just smile"),
            new Phrase("Be the change"),
            new Phrase("life is short"),
            new Phrase("Never give up"),
            new Phrase("Dream big"),
            new Phrase("Feed the brain"),
            new Phrase("Live today"),
            new Phrase("Gratitude"),
            new Phrase("Enjoy life"),
            new Phrase("Love yourself first"),
            new Phrase("It always works out"),
            new Phrase("Just belive in yourself"),
            new Phrase("Follow your heart"),
            new Phrase("Life starts when you take risk"),
            new Phrase("Life is a beautiful journey"),
            new Phrase("Failing is part of the process")
        ];
                    
        return phrases;
            
    }

    //creating the random   phrase generator
    getRandomPhrase() {
        return this.phrases[Math.floor(Math.random() * this.phrases.length)];
    }

    //getting method for the player that is playing
    get isPlaying() {
        return $("#phrase .letter.hide").length !== 0 && // Check if player hasn't won
            this.missed < this.totalHearts;              // and hasn't lost
    }

    // getting the game difficulty
    get difficulty() {
        return $("#difficulty").val();
    }

    // Determine the number of hearts that the player has
    get totalHearts() {
        // Considering the difficulty value, return the number of hearts corresponding to it
        switch (this.difficulty) {
            // 5 hearts for Easy
            case "easy":   
                return 5;

            // 3 hearts for mediun
            case "medium":  
                return 3;

            // 1 heart for hard
            case "hard":   
                return 1;
        }
    }

    //creating the start game method. 
    startGame(){
        //selecting the overlay id and making its display equals 'none'
        document.getElementById("overlay").style.display = "none";
        this.activePhrase = this.getRandomPhrase();
        this.activePhrase.addPhraseToDisplay();
        this.resetGame();
    }



    static showMatchedLetter(letter) {
        $(`#phrase .${letter}`)     
            .removeClass("hide")    
            .addClass("show")      
    }


    //Creating the handleInteraction to handle the logic of the game
    // matching the buttons to the letter in the phrase.
    handleInteraction(letterButton) {
        if (letterButton.tagName == 'BUTTON') {

            let letter = letterButton.textContent
            letterButton.disabled = true;
            
            if (!game.activePhrase.checkLetter(letter)) {
                letterButton.className = ('wrong');
                this.removeLife();
            } else {
                letterButton.className = ('chosen');
                game.activePhrase = Phrase.showMatchedLetter(letter);
                this.checkForWin();     
            }
        } 
        //checking if the user won
        if (this.checkForWin() == true) { 
            //passing true on the gameover method
            this.gameOver(true); 
        } 
        
         
    }
    //adding a boolen to the checkforwin method
    checkForWin() {
    const hideLetters = document.getElementsByClassName('hide').length;
        if (!hideLetters) {
            return true;
        } else {
            return false;
            }
        }
    //method for removing life on losses. 


    removeLife() {
        // Increment miss counter
        this.missed += 1;

        // Remove a heart from the board
        const $heart = $("#scoreboard .tries img[src$='liveHeart.png']")
            .last();

       
            
                $heart.attr("src", "images/lostHeart.png");

                // Ending the gameIf miss counter is greater than or equal to the total number of hearts
                
                if (this.missed >= this.totalHearts) {
                    // Reveal what the phrase was
                    $("#phrase li.letter.hide")
                        .removeClass("hide")
                        .addClass("show");

                    // Wait 5 seconds before ending game
                    setTimeout(() => {
                        
                        this.gameOver("lose");
                    }, 5000)
                }
            
    }

    gameOver(wonGame){
        document.getElementById('overlay').style.display = 'flex';
        if(wonGame === true){
            document.getElementById('game-over-message').innerText = 'You won!';
            document.getElementById('overlay').className = 'win';
            document.getElementById("btn__reset").textContent = "Play again";
        } else {
            document.getElementById('game-over-message').innerText = "Sorry you lost";
            document.getElementById('overlay').className = 'lose';
            document.getElementById("btn__reset").textContent = "Try again";
        }
    }

    resetGame() {
        const ul = document.querySelector('ul');
        const li = ul.querySelectorAll('li');
        const qwertyDiv = document.getElementById('qwerty');
        const buttons = qwertyDiv.querySelectorAll('button');
        const img = document.querySelectorAll('img');
        this.missed = 0;
        for (let i = 0; i < li.length; i++) {
            li[i].remove();       
        }
        
            this.activePhrase = this.getRandomPhrase();
            this.activePhrase.addPhraseToDisplay();

            for (let i = 0; i < buttons.length; i++) {
                buttons[i].disabled = false;
                buttons[i].className = 'key';
        }

            img.forEach(image => image.src = 'images/liveHeart.png'); 
    }
    
}

