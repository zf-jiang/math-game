// Initialize global game variables
let incorrect = 0;
let currentScore = 0;
let highScore = 0;
let mathType = "";
let mathDifficulty = "";
let correctAnswer = 0;
let playing = false;
startWait();

// Shows the player the welcome screen
function startWait() {
    // Sets the game state to waiting
    playing = false;
    document.getElementById("welcome").style.display = "block";
    document.getElementById("welcome2").style.display = "block";
    document.getElementById("options").style.display = "block";
    document.getElementById("game").style.display = "none";
    document.getElementById("tip").innerHTML = "";
    document.getElementById("gamebtn").innerHTML = "Start Game"
    // Trigger an event when the game button is clicked
    document.getElementById("gamebtn").addEventListener("click", gameHelper);
    return;
}

// Determine whether game button should begin the game or reset the game
function gameHelper() {
    if (playing === true) {
        // If user is currently playing, reset the game
        startWait();
    }
    else {
        // If user is not currently playing, start the game
        gameSetup();
    }
    return;
}

// Shows the player the game screen
function gameSetup() {
    // Sets the game state to playing and resets the current score
    playing = true;
    currentScore = 0;
    incorrect = 0;
    let userAnswer = 0;
    // Hide elements in the welcome screen
    document.getElementById("welcome").style.display = "none";
    document.getElementById("welcome2").style.display = "none";
    document.getElementById("options").style.display = "none";
    // Gets the previously selected game criteria for questions to be generated later
    mathType = document.getElementById("type").value;
    mathDifficulty = document.getElementById("difficulty").value;
    // Sets screen to show game elements
    document.getElementById("game").style.display = "block";
    document.getElementById("current-score").innerHTML = currentScore;
    document.getElementById("incorrect").innerHTML = incorrect;
    document.getElementById("new-high-score").style.display = "none";
    document.getElementById("wrong").style.display = "none";
    document.getElementById("gamebtn").innerHTML = "Reset Game"
    getQuestion(mathType, mathDifficulty, true);
    // Submits the player's answer if they press enter
    document.getElementById("answer").addEventListener("keydown", function (e) {
        if (e.keyCode === 13) {
            // Parse the answer input as a float for division problems that involve decimals
            userAnswer = parseFloat(document.getElementById("answer").value);
            document.getElementById("answer").value = "";
            let correct = checkAnswer(userAnswer);
            // Display a new math question (only if previous question has been solved)
            getQuestion(mathType, mathDifficulty, correct);
            // Keeps track of the player's current score and updates the high score if current score is higher
            // Also updates the number of incorrect answers
            document.getElementById("current-score").innerHTML = currentScore;
            document.getElementById("incorrect").innerHTML = incorrect;
            if (currentScore > highScore) {
                document.getElementById("new-high-score").style.display = "block";
                highScore = currentScore;
                document.getElementById("high-score").innerHTML = highScore;
            }
            return false;
        }
    });
    return;
}

// Generate a new question based on previously selected type and difficulty
function getQuestion(type, difficulty, correctOrNot) {
    // Get a new question only if previous answer was right
    // Otherwise prompt the player to try again
    if (correctOrNot === false) {
        document.getElementById("wrong").style.display = "block";
        return;
    }
    let num1 = 0;
    let num2 = 0;
    document.getElementById("wrong").style.display = "none";
    switch(difficulty) {
        // Randomly generate two numbers between 1-10
        case "easy":
            num1 = Math.floor(Math.random() * 10) + 1;
            num2 = Math.floor(Math.random() * 10) + 1;
            break;
        // Randomly generate two numbers between 11-100
        case "medium":
            num1 = Math.floor(Math.random() * 100) + 1;
            num2 = Math.floor(Math.random() * 100) + 1;
            break;
        // Randomly generate two numbers between 101-1000
        case "hard":
            num1 = Math.floor(Math.random() * 1000) + 1;
            num2 = Math.floor(Math.random() * 1000) + 1;
            break;
    }
    // Displays the question based on previously selected criteria and calculates the correct answer
    // using the two randomly generated numbers num1 and num2
    switch(type) {
        case "add":
            document.getElementById("question").innerHTML = num1 + " + " + num2 + " = ?";
            correctAnswer = num1 + num2;
            break;
        case "sub":
            document.getElementById("question").innerHTML = num1 + " - " + num2 + " = ?";
            correctAnswer = num1 - num2;
            break;
        case "mul":
            document.getElementById("question").innerHTML = num1 + " x " + num2 + " = ?";
            correctAnswer = num1 * num2;
            break;
        case "div":
            document.getElementById("question").innerHTML = num1 + " / " + num2 + " = ?";
            correctAnswer = num1 / num2;
            // Round quotient to two decimal places
            correctAnswer = Math.round((correctAnswer + Number.EPSILON) * 100) / 100;
            document.getElementById("tip").innerHTML = "Round to the nearest 2 decimals"
            break;
    }
    return;
}

// Checks the player's answer against the correct answer
function checkAnswer(userAnswer) {
    if (userAnswer === correctAnswer) {
        // Updates the player's current score
        currentScore++;
        return true;
    }
    else {
        // Updates the player's number of incorrect answers
        incorrect++;
        return false;
    }
}

// The following code is for drawing falling numbers in the background inspired by "matrix rain"
// Initialize the HTML canvas
let canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d');

// Set up columns and drops for the numbers to "fall"
let fontSize = 10;
let columns = canvas.width / fontSize;
let drops = [];
let i = 0;
for (i = 0; i < columns; i++) {
    drops[i] = 1;
}

// Draws the falling numbers
function draw() {
    // Create white background with 50% opacity
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    let i = 0;
    for (i = 0; i < drops.length; i++) {
        // Generate random number from 0-9
        let text = Math.floor(Math.random() * 10);
        ctx.fillStyle = '#B0E0E6';
        // Fill screen with randomly dropped numbers
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        drops[i]++;
        if (drops[i] * fontSize > canvas.height && Math.random() > .95) {
            drops[i] = 0;
        }
    }
    return;
}

// Loop the drawing function
setInterval(draw, 250);