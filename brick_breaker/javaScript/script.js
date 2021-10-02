// Reference to the canvas and variable used to paint on the canvas in 2d
    var canvas = document.getElementById('gameArea');
    var ctx = canvas.getContext("2d");

// Used to define where the ball should be drawn on the canvas
    var x = canvas.width / 2;
    var y = canvas.height - 30;

// Speed of the Ball: small values added to x and y to make ball look like it's moving
    var dx = 2;
    var dy = -2;

// Variable that stores the ball's radius
    var ballRadius = 10;

// Variables for the bricks
    var brickRowCount = 5;
    var brickColCount = 9;
    var brickWidth = 70;
    var brickHeight = 20;
    var brickPadding = 10;
    var brickOffsetTop = 30;
    var brickOffsetLeft = 40;

// Variables for the player's paddle
    var paddleHeight = 10;
    var paddleWidth = 85;
    var paddleX = (canvas.width-paddleWidth) / 2;

// Variables for pressed keys
    var rightKey = false;
    var leftKey = false;
    
// Variable for player's score
    var score = 0;

// Variable for player's life
    var lives = 3

// Variable for the bricks
    var bricks = [];
    for(var col = 0; col < brickColCount; col++) {
        bricks[col] = [];
        for(var row = 0; row < brickRowCount; row++) {
            bricks[col][row] = {
                x: 0,
                y: 0,
                status: 1
            }
        }
    }

// Listening for key presses
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false)

// Functions that handle key presses
    function keyDownHandler(event) {
        if(event.key == "Right" || event.key == "ArrowRight") {
            rightKey = true;
        } else if (event.key == "Left" || event.key == "ArrowLeft") {
            leftKey = true;
        }
    }

    function keyUpHandler(event) {
        if(event.key == "Right" || event.key == "ArrowRight") {
            rightKey = false;
        } else if(event.key == "Left" || event.key == "ArrowLeft") {
            leftKey = false;
        }
    }

// Detecting collisions between ball and bricks
    function collisionDetect() {
        for(var col = 0; col < brickColCount; col++) {
            for(var row = 0; row < brickRowCount; row++) {
                var brick = bricks[col][row];
                // Checking status of bricks, if brick is hit the status will be changed to 0 and the brick disappears
                if(brick.status == 1) {
                    // Ball x position being greater than brick x position and less than plus brick's with
                    // Ball y position being greater than brick y position and less than plus brick's height
                    if(x > brick.x && x < brick.x + brickWidth && y > brick.y && y < brick.y + brickHeight ) {
                        dy = -dy;
                        brick.status = 0;
                        score++

                        // Display message when all bicks disappear
                        if(score == brickRowCount * brickColCount) {
                            alert("CONGRADULATIONS!!!");
                            document.location.reload();
                            clearInterval(interval);
                        }
                    }
                }
            }
        }
    }

// Drawing the ball
    function drawBall() {
        ctx.beginPath();
        ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = "#c989eb";
        ctx.fill();
        ctx.closePath();
    }

// Drawing the bricks
    function drawBricks() {
        for(var col = 0; col < brickColCount; col++) {
            for(var row = 0; row < brickRowCount; row++) {
                if(bricks[col][row].status == 1) {

                    var brickX = (col * (brickWidth + brickPadding)) + brickOffsetLeft;
                    var brickY = (row * (brickHeight + brickPadding)) + brickOffsetTop;

                    bricks[col][row].x = brickX;
                    bricks[col][row].y = brickY;

                    ctx.beginPath();
                    ctx.rect(brickX, brickY, brickWidth, brickHeight);
                    ctx.fillStyle = "#8b5fbf";
                    ctx.fill();
                    ctx.closePath();
                }
            }
        }
    }

// Drawing the paddle
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#ced3dc";
    ctx.fill();
    ctx.closePath();
}

// Creating the score
function drawScore() {
    ctx.font = "16px serif";
    ctx.fillStyle = "#FFF";
    ctx.fillText("SCORE: " + score, canvas.width - 70, 20);
}

// Creating lives
function drawLives() {
    ctx.font = "16px Roboto";
    ctx.fillStyle = "#FFF";
    ctx.fillText("Lives: " + lives, 10, 380);
}

function draw() {
    // Clears the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Calling the draw functions for ball, bricks and paddle
    drawBall();
    drawBricks();
    drawPaddle();

    // Calling the collision, score and lives functions
    collisionDetect();
    drawScore();
    drawLives();

    // Bouncing the ball off the walls 
    // If the ball's y position is lower than 0, reverse direction and set it equal to itself 
    // or if the ball's y position is greater than canvas height reverse direction, use ballRadius to make collision smoother
    // (y + dy < ballRadius) deals with the ball bouncing off the top edge
    // (y + dy > canvas.height-ballRadius) deals with the ball bouncing off the bottom edge
        if(y + dy < ballRadius) {
            dy = -dy;
        } else if (y + dy > canvas.height-ballRadius) {
            if(x > paddleX && x < paddleX + paddleWidth) {
                dy = -dy;
            } else {
                lives--;
                if(!lives) {
                    // Will issue a game over if the ball hits the bottom of canvas
                    alert("GAME OVER");
                    document.location.reload();
                    clearInterval(interval); // For chrome browser
                } else {
                    x = canvas.width / 2;
                    y = canvas.height - 30;
                    dx = 2;
                    dy = -2;
                    paddleX = (canvas.width - paddleWidth) / 2;
                }
            }
        }
                
    // (x + dx < ballRadius) deal with bouncing off the left edge
    // (x + dx > canvas.width-ballRadius) deals with bouncing off the right edge
        if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
            dx = -dx;
        }

    // To get the paddle moving
        if(rightKey) {
            paddleX += 7;

            // Will make the paddle move only with the canvas boundaries
            if(paddleX + paddleWidth > canvas.width) {
                paddleX = canvas.width - paddleWidth;
            }
        } else if(leftKey) {
            paddleX -= 7;
            if(paddleX < 0) {
                paddleX = 0;
            }
        }

    // dx and dy added to x and y so the ball is painted in new position on all updates
        x += dx;
        y += dy;
}
var interval = setInterval(draw, 10);