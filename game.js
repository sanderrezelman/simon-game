var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var level = 0;

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level = level + 1;
    $("#level-title").text("Level " + level);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("." + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
      }, 100);
}

$(".btn").on('click', function(event) {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

$(document).keypress(function(event) {
    nextSequence();
})

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] == gamePattern[currentLevel])  {
        console.log("User click pattern: " + userClickedPattern);
        console.log("Gamepattern: " + gamePattern);
        console.log("Level up!!!");
        if (userClickedPattern.length == gamePattern.length) {
            setTimeout(function () {
                nextSequence();
              }, 1000);
              userClickedPattern = [];
        }
    } else {
        console.log("User click pattern: " + userClickedPattern);
        console.log("Gamepattern: " + gamePattern);
        console.log("Game over!!!");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
      $("#level-title").text("Game Over, Press Any Key to Restart");
      startOver();
    } 
    
    
}

function startOver() {
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
}
