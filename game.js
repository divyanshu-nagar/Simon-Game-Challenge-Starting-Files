
var buttonColours = ["red","blue","green","yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var acceptClicks = false;
var level = 0;

$(document).keypress(function() {
    if(!started) {
        started = true;
        $("#level-title").text("Level " + level);
        nextSequence();
    }
});

$(".btn").click(function() {

    if(!started || !acceptClicks) return;

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  
  playSound(userChosenColour);
  animatePress(userChosenColour, 150);

  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {

    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){

        console.log("success");
    

     if(userClickedPattern.length === gamePattern.length){

        acceptClicks = false;
      setTimeout(function(){
        nextSequence();
         },1000);
      }

    } else{
        acceptClicks = false;
 
         console.log("wrong");

         playSound("wrong");

         $("body").addClass("game-over");
         setTimeout(function(){
            $("body").removeClass("game-over");
         }, 200);

         $("#level-title").text("Game Over, Press Any Key to Restart");

         startOver();
 
        }
    

}



function nextSequence() {

    userClickedPattern = [];
    acceptClicks = false;
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4 ); 
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    console.log(gamePattern);
    playSequence();

    
}

function playSequence(){
    gamePattern.forEach(function (color, i){
        setTimeout(function(){
            playSound(color);
            animatePress(color, 300);
            if(i === gamePattern.length - 1) {
                acceptClicks = true;
            }
        }, (i+1)*700);
    });
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour , time){
  $("#" + currentColour).addClass("pressed");
  setTimeout(function(){
    $("#"+ currentColour).removeClass("pressed"); 
 },time);
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}


