var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];  //random colours
var userClickedPattern = []; //colours clicked by user
var level = 1; //game round
var state = "ready" // states include "ready", "in-progress" and "game-over"

// start state
renderByState();

// state change by keydown
document.addEventListener("keydown",function (event) {
        if (state === "ready"){
            state = "in-progress";
        } else if (state === "game-over") {
            state = "ready";
        }
        renderByState();
    })

// state change by click
document.addEventListener("click",function (event) {
    if (state === "in-progress") {
        // record the user input
        var userClickedColour = event.target.id;
        buttonAnimation(userClickedColour);
        buttonSound(userClickedColour);
        userClickedPattern.push(userClickedColour);
        
        // see if the user input is right
        if (userClickedPattern.length === gamePattern.length) {
            if (arraysAreEqual(userClickedPattern, gamePattern)) {
                    // enter the next round
                    level++;
                    userClickedPattern = [];
                } else {state = "game-over";}
            setTimeout(renderByState,800);
        }
    }
}) 

// render state
function renderByState(){
    if (state === "in-progress") {
       // change title
       document.querySelector("#level-title").innerHTML = "Level "+ level;

        // choose a random color for game Pattern
        var randomChosenColour = buttonColours[nextSequence()];
        gamePattern.push(randomChosenColour);

        // play the animation and sound for this level
        buttonAnimation(gamePattern[level-1]);
        buttonSound(gamePattern[level-1]);       
        
    } else if (state === "game-over") {
        gameOver();
    } else if (state === "ready") {
        document.querySelector("#level-title").innerHTML = "Press A Key to Start";
    }
}

function nextSequence(){
    var randomNumber = Math.floor(Math.random()*3);
    return randomNumber;
}

function buttonAnimation(colour){
    var activeButton = document.querySelector("#"+colour);
    activeButton.classList.add("pressed");
    setTimeout(function(){
        activeButton.classList.remove("pressed")},100);
}

function buttonSound(colour) {
    switch (colour) {
        case "red":
            var audio_red =new Audio("sounds/red.mp3");
            audio_red.play();
            break;
        case "blue":
            var audio_blue =new Audio("sounds/blue.mp3");
            audio_blue.play();
            break;        
        case "yellow":
            var audio_yellow =new Audio("sounds/yellow.mp3");
            audio_yellow.play();
            break;        
        case "green":
            var audio_green =new Audio("sounds/green.mp3");
            audio_green.play();
            break;       
        default: 
            break;
    }
}

function gameOver(){
    buttonSound("game-over");
    document.querySelector("#level-title").innerHTML = "Game Over. Press Any Key to Restart"
    document.querySelector("body").classList.add("game-over");
    setTimeout(function(){document.querySelector("body").classList.remove("game-over");},100);
    
    // // clear game history 
    // gamePattern = []; 
    // userClickedPattern = []; 
    // level = 1;
}

function arraysAreEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }
    
    for (var i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }
    
    return true;
}
