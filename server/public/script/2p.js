// console.clear();
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const scoreText = document.querySelector('#scoreText');
const resetBtn = document.querySelector('#resetBtn');
const winnerText = document.querySelector('#winnerText');
// console.log(resetBtn);
//  Game
const gameX= canvas.width;
const gameY= canvas.height;
const gameBg = '#000';


//  PLayer
const playerBoarder = 'gray';
const playerSpeed = 100;
const player_1_Color = 'blue';
const player_2_Color = 'red';
let player_1_Score = 0;
let player_2_Score = 0;

let player_1 = {
    width: 25,
    height: 100,
    x: 0,
    y: 200
}
let player_2 = {
    width: 25,
    height: 100,
    x: gameX -25,
    y: 200
}


//  Ball
const ballColor = 'yellow'
const ballBoarder = 'white';
const ballRadius = 13.5;
let ballSpeed = 1;
let ballX = gameX/2;
let ballY = gameY/2;
let ballXDirection = 0;
let ballYDirection = 0;


let intervalID, running = true;




window.addEventListener('keydown', changeDirection);
resetBtn.addEventListener('click', resetGame);

gameStart();

function gameStart() {
    createBall();
    nextTick();
};
function nextTick() {
    intervalID = setTimeout(() => {      
        clearBoard();
        drawPlayer();
        moveBall();
        drawBall(ballX, ballY);
        checkCollision();
        nextTick();
    },10);
};
function clearBoard() {
    ctx.fillStyle = gameBg;
    ctx.fillRect(0, 0, gameX, gameY);
};
function drawPlayer() {
    ctx.strokeStyle = playerBoarder;

    ctx.fillStyle = player_1_Color;
    ctx.fillRect(player_1.x, player_1.y, player_1.width, player_1.height);
    ctx.strokeRect(player_1.x, player_1.y, player_1.width, player_1.height);

    ctx.fillStyle = player_2_Color;
    ctx.fillRect(player_2.x, player_2.y, player_2.width, player_2.height);
    ctx.strokeRect(player_2.x, player_2.y, player_2.width, player_2.height);
};
function createBall() {
    ballSpeed = 1;
    if(Math.round(Math.random()) == 1) {
        ballXDirection = 1;
    } else {
        ballXDirection = -1
    }
    if(Math.round(Math.random()) == 1) {
        ballYDirection = 1;
    } else {
        ballYDirection = -1
    }
    ballX =  gameX / 2;
    ballY =  gameY / 2;
    drawBall(ballX, ballY)
};
function moveBall() {
    if(running) {
        ballX += (ballXDirection * ballSpeed)
        ballY += (ballYDirection * ballSpeed)
    }
};
function drawBall(ballX, ballY) {
    ctx.fillStyle = ballColor;
    ctx.strokeStyle = ballBoarder;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, 2 * Math.PI);
    ctx.stroke()
    ctx.fill();
};
function checkCollision() {
    if(ballY <= 0 + ballRadius) return ballYDirection *= -1;
    if(ballY >= gameY - ballRadius) return ballYDirection *= -1;

    if(ballX <= 0) {
        player_2_Score++;
        updateScore();
        createBall();
        checkWinner();
        return;
    }
    if(ballX >= gameX) {
        player_1_Score++;
        updateScore();
        createBall();
        checkWinner();
        return;
    }

    if(ballX <= (player_1.x + player_1.width + ballRadius)) {
        if(ballY > player_1.y && ballY < player_1.y + player_1.height) {
            ballX = (player_1.x + player_1.width) + ballRadius;
            ballXDirection *= -1;
            ballSpeed++;
        } 
    }
    if(ballX >= (player_2.x - ballRadius)) {
        if(ballY > player_2.y && ballY < player_2.y + player_2.height) {
            ballX = (player_2.x - ballRadius);
            ballXDirection *= -1;
            ballSpeed++;
        } 
    }
};
function changeDirection(event) {
    const keyPress = event.keyCode;
    // console.log(keyPress)
    const W = 87;
    const S = 83;
    const UP = 38;
    const DOWN = 40;

    switch (keyPress) {
        case(W):
            if(player_1.y > 0) {
                player_1.y -= playerSpeed;
            }
            break;
        case(S):
            if(player_1.y < gameY-player_1.height) {
                player_1.y += playerSpeed;
            }
            break;
        case(UP):
            if(player_2.y > 0) {
                player_2.y -= playerSpeed;
            }
            break;
        case(DOWN):
            if(player_2.y < gameY-player_2.height) {
                player_2.y += playerSpeed;
            }
            break;
    }
};
function checkWinner() {
    if(player_1_Score === 3) {
        setTimeout(resetGame(), 3000);
        winnerText.textContent = `Blue Is Winner`;
        winnerText.style.display = 'block';
        setTimeout(() => {
            winnerText.style.display = 'none';
        },5000)
    } else if(player_2_Score === 3) {
        setTimeout(resetGame(), 3000);
        winnerText.textContent = `Red Is Winner`;
        winnerText.style.display = 'block';
        setTimeout(() => {
            winnerText.style.display = 'none';
        },5000)
    }
}
function updateScore() {
    scoreText.textContent = `${player_1_Score} : ${player_2_Score}`;
};
function resetGame() {
    running = false;
    player_1_Score = 0;
    player_2_Score = 0;

    player_1 = {
        width: 25,
        height: 100,
        x: 0,
        y: 200
    }
    player_2 = {
        width: 25,
        height: 100,
        x: gameX -25,
        y: 200
    }

    ballSpeed = 0;
    ballX = 0;
    ballY = 0;
    ballXDirection = 0;
    ballYDirection = 0;
    updateScore();
    clearInterval(intervalID);
    gameStart();

    setTimeout(() => {
        running = true;
    }, 5000);
}