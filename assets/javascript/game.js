
//Master word array, modify this array to change which words will be in the game

MasterWordArr = ["SONIC", "TAILS", "SEGA", "ADVENTURE", "EGGMAN", "KNUCKLES","EMERALD"];
//var UnderscoreArr = [];


if (confirm("Can you guess all seven hidden words?\n\nTurn up the volume and press either button to play...")) {
    var InitializingRound = true;
    var DoneWithRound = true;
    var remainingGuesses = 6;
    var WordToGuess = [];
    var MyRandomNumber = 0;
    var UnderscoreArr = [];
    var GuessedLetters = [];
    var correctGuess = false;
var wordsCompleted = 0;

    document.getElementById("Remaining_Guesses").innerHTML = "<p2>Remaining Guesses: &nbsp" + remainingGuesses + "</p2>";

} else {
    var DoneWithRound = true;
    var InitializingRound = true;
    var remainingGuesses = 6;
    var WordToGuess = [];
    var MyRandomNumber = 0;
    var UnderscoreArr = [];
    var GuessedLetters = [];
    var correctGuess = false;
    var wordsCompleted = 0;

    document.getElementById("Remaining_Guesses").innerHTML = "<p2>Remaining Guesses: &nbsp" + remainingGuesses + "</p2>";

}
//Start the game  


document.onkeyup = function () {

    var mainMusic= document.getElementById("myAudio");

    mainMusic.loop = true;
    mainMusic.load();

}


document.onkeyup = function () {

   
    
    //store the userguess

    var userguess = String.fromCharCode(event.keyCode).toUpperCase();
    

   


    //Initializes the game

    if (InitializingRound == true && DoneWithRound == true) {

        //clear html content from previous round

        var myNode = document.getElementById("Hangman_Game");
        while (myNode.firstChild) {
            myNode.removeChild(myNode.firstChild);

        }
       
          var myNode = document.getElementById("Guessed_Letters");
        while (myNode.firstChild) {
          myNode.removeChild(myNode.firstChild);
            
        }


        MyRandomNumber = Math.floor(Math.random() * MasterWordArr.length);


        WordToGuess = MasterWordArr[MyRandomNumber].split("");

       

        UnderscoreArr = [];

        GuessedLetters = [];


        //log the spaces

        for (var j = 0; j < WordToGuess.length; j++) {

            UnderscoreArr[j] = "_";
           

            // document.getElementById("Hangman_Underscores").textContent = UnderscoreArr[j];

            var node = document.createElement("p1");
            var textnode = document.createTextNode(UnderscoreArr[j]);
            node.appendChild(textnode);
            document.getElementById("Hangman_Game").appendChild(node);



        }

        remainingGuesses = 6;
        DoneWithRound = false;

    }


    //check to see if the userguess is a letter
/*
    Personal Note:

    if (event.keyCode >= 48 && event.keyCode <= 57)
    alert("input was 0-9");
*/
    //Check to see if the user inputs a letter
    if (event.keyCode >= 65 && event.keyCode <= 90){   
    
    //gameplay

    if (InitializingRound == false) {


        for (var k = 0; k < WordToGuess.length; k++) {

            if (userguess == WordToGuess[k]) {

                UnderscoreArr[k] = WordToGuess[k];
                correctGuess = true;

            }


        }


        //Clear Previous Turn
        
        var myNode = document.getElementById("Hangman_Game");
        while (myNode.firstChild) {
            myNode.removeChild(myNode.firstChild);
            
        }

        
        //Update Hangman Array to Reflect New Guess
        for (var y = 0; y < WordToGuess.length; y++) {


            var node = document.createElement("p1");
            var textnode = document.createTextNode(UnderscoreArr[y]);
            node.appendChild(textnode);
            document.getElementById("Hangman_Game").appendChild(node);


        }

        //Check to see if user guessed incorrectly and print incorrect guess to screen

        if (correctGuess == false) {

           remainingGuesses = remainingGuesses -1;

            var node2 = document.createElement("p2");
            var textnode2 = document.createTextNode(userguess);
            node2.appendChild(textnode2);
            document.getElementById("Guessed_Letters").appendChild(node2);

        }

        //Check to see if the user guessed the whole word correctly
    
        DoneWithRound = true;

        for (var k = 0; k < WordToGuess.length; k++) {

            if (UnderscoreArr[k] != WordToGuess[k]) {

                DoneWithRound = false;

            }

        }

        

     

        //remainingGuesses = remainingGuesses - 1;


    }

    /*         
         for (var j = 0; j < WordToGuess.length; j++) {
 
             UnderscoreArr[j] = "_";
             console.log(UnderscoreArr[j]);
 
             // document.getElementById("Hangman_Underscores").textContent = UnderscoreArr[j];
 
             var node = document.createElement("h3");
             var textnode = document.createTextNode(UnderscoreArr[j]);
             node.appendChild(textnode);
             document.getElementById("Hangman_Game").appendChild(node);
 
 
 
         }
        
*/
        }
    document.getElementById("Remaining_Guesses").innerHTML = "<p2>Remaining Guesses: &nbsp" + remainingGuesses + "</p2>";

    correctGuess = false;

    InitializingRound = false;


    //Deletes guessed word from the master array, so that it won't be generated twice in the same game

//If you win the round...

    if (MasterWordArr.length > 1 && DoneWithRound == true) {
        MasterWordArr.splice(MyRandomNumber, 1);
        InitializingRound = true;   
        
        wordsCompleted = wordsCompleted + 1;

        document.getElementById("Completed_Words").innerHTML = "<p2>Words Completed: &nbsp" + wordsCompleted + "</p2>";
        

         //reinitializes remaining guesses back to 3 

          remainingGuesses = 6;
 
//If you win the game...          
        
    }
    else if (MasterWordArr.length == 1 && DoneWithRound == true) {
        document.getElementById("GameContainer").innerHTML = "<h1>Congratulations!!! <br> <br> You Win!!! </h1>";

    }

//If you lose the game...    

    else if (remainingGuesses == 0) {

        document.getElementById("GameContainer").innerHTML = "<h1>Game Over <br> <br> Refresh the page to try again!</h1>";
    }



}