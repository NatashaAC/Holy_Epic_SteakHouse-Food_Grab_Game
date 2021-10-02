$(document).ready(function() {
    // Testing
    // console.log("hello");

    // Variable for the start button
    var startBtn = document.getElementById("startButton");

    // Variable for score
    var playerScore = 0;

    // Audio for clicks
    var clickAudio = new Audio("./audio/crunch.mp3");

    // Variables for the Height and Weight for Game Area 
    var gameAreaHeight = $("#game").height();
    var gameAreaWidth = $("#game").width();

    // Variables for the Height and Width of the Game Piece
    var imgWidth = $("#specialSteak").width();
    var imgHeight = $("#specialSteak").height();

    // Max Height and Width to determine the top and left positions for the 
    // game pieces to appear on the game area
    var maxHeight = gameAreaHeight - imgHeight;
    var maxWidth = gameAreaWidth - imgWidth;

    // Variables for setIntervals
    var clearFastPieces;
    var clearAvgPieces;
    var clearSlowPieces;
    var pieceInterval;

    // Function to display other food items
    function displayItems() {
        clearFastPieces = setInterval(function() {
            $("#burgerDish").fadeIn().css({
                left: Math.floor(Math.random() * maxWidth),
                top: Math.floor(Math.random() * maxHeight)
            }).delay(1000).fadeOut();
            $("#icecreamDish").fadeIn().css({
                left: Math.floor(Math.random() * maxWidth),
                top: Math.floor(Math.random() * maxHeight)
            }).delay(500).fadeOut();
        }, 2000);

        clearAvgPieces = setInterval(function() {
            $("#steakDish").fadeIn().css({
                left: Math.floor(Math.random() * maxWidth),
                top: Math.floor(Math.random() * maxHeight)
            }).delay(1200).fadeOut();
            $("#ramenDish").fadeIn().css({
                left: Math.floor(Math.random() * maxWidth),
                top: Math.floor(Math.random() * maxHeight)
            }).delay(1300).fadeOut();
            $("#friesDish").fadeIn().css({
                left: Math.floor(Math.random() * maxWidth),
                top: Math.floor(Math.random() * maxHeight)
            }).delay(1400).fadeOut();
            $("#cocoDish").fadeIn().css({
                left: Math.floor(Math.random() * maxWidth),
                top: Math.floor(Math.random() * maxHeight)
            }).delay(1500).fadeOut();
        }, 3000);

        clearSlowPieces = setInterval(function() {
            $("#dumplinDish").fadeIn().css({
                left: Math.floor(Math.random() * maxWidth),
                top: Math.floor(Math.random() * maxHeight)
            }).delay(1500).fadeOut();
            $("#sushiDish").fadeIn().css({
                left: Math.floor(Math.random() * maxWidth),
                top: Math.floor(Math.random() * maxHeight)
            }).delay(2000).fadeOut();
            $("#cheeseDish").fadeIn().css({
                left: Math.floor(Math.random() * maxWidth),
                top: Math.floor(Math.random() * maxHeight)
            }).delay(2200).fadeOut();
        }, 4000);
    }

    // Function to display special steak item
    function specialItem() {
        pieceInterval = setInterval(function() {
            $("#specialSteak").fadeIn().css({
                left: Math.floor(Math.random() * maxWidth),
                top: Math.floor(Math.random() * maxHeight)
            }).fadeOut();
        }, 5000);
    }

    // Calls startGame function when button is clicked and hides Game Title
    $("#startButton").click(function () {
        startGame();
        $("#gameTitle").hide();
        playerScore = 0;
    });

    // Function that starts the game
    function startGame() {
        // Display Score and update 
        $("#scoreText").show();
        var clearScore = setInterval(() => {
                var scoreCounter = document.getElementById("scoreText");
                scoreCounter.innerText = "Score: " + playerScore;
        }, 10);

        // Calling display functions
        displayItems();
        specialItem();

        // Hiding items and assigning a point value 
        $("#burgerDish").click(function() { $(this).hide(); playerScore += 5;  clickAudio.play();});
        $("#icecreamDish").click(function() { $(this).hide(); playerScore += 5;  clickAudio.play();});
        $("#steakDish").click(function() { $(this).hide(); playerScore += 10;  clickAudio.play();});
        $("#ramenDish").click(function() { $(this).hide(); playerScore += 10;  clickAudio.play();});
        $("#friesDish").click(function() { $(this).hide(); playerScore += 10;  clickAudio.play();});
        $("#cocoDish").click(function() { $(this).hide(); playerScore += 15;  clickAudio.play();});
        $("#dumplinDish").click(function() { $(this).hide();playerScore += 15;  clickAudio.play();});
        $("#sushiDish").click(function() { $(this).hide(); playerScore += 15;  clickAudio.play();});
        $("#cheeseDish").click(function() { $(this).hide(); playerScore += 15;  clickAudio.play();});
        $(".gamePiece").click(function() { $(this).remove(); playerScore += 5000;  clickAudio.play();});

        // Function to clear the game area
        function clearGameArea() {
            // Clearing the intervals
            clearInterval(pieceInterval);
            clearInterval(clearFastPieces);
            clearInterval(clearAvgPieces);
            clearInterval(clearSlowPieces);
            clearInterval(clearScore);

            // Display title screen again and player's score
            $("#gameTitle").show(function () {
                clearScore = setInterval(() => {
                    if(playerScore < 20000) {
                        startBtn.innerHTML = "Try Again?";
                        $("#howTo").text("Sorry you lose! Score: " + playerScore);
                    } else {
                        $("#howTo").text("Congradulations, You've won a free three course dinner!! Score: " + playerScore);
                    }
                }, 10);
            });

            // Hiding the items on the game area
            $("#scoreText").hide();
            $("#specialSteak").hide();
            $("#burgerDish").hide();
            $("#icecreamDish").hide();
            $("#steakDish").hide();
            $("#ramenDish").hide();
            $("#friesDish").hide();
            $("#cocoDish").hide();
            $("#dumplinDish").hide();
            $("#sushiDish").hide();
            $("#cheeseDish").hide();
        }

        // Will call the clearGameArea after 30 seconds
        setTimeout(clearGameArea, 30000);
    };
});