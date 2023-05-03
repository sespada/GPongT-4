const canvas = document.getElementById("pong");
const context = canvas.getContext("2d");

const paddleWidth = 10;
const paddleHeight = 100;
const ballSize = 10;

const leftPaddle = {
    x: 10,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    dy: 0
};

const rightPaddle = {
    x: canvas.width - (paddleWidth + 10),
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    dy: 0
};

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: ballSize,
    dx: 4,
    dy: 4
};

function drawRect(x, y, width, height, color) {
    context.fillStyle = color;
    context.fillRect(x, y, width, height);
}

function drawCircle(x, y, radius, color) {
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI);
    context.fill();
}

function movePaddles() {
    leftPaddle.y += leftPaddle.dy;
    rightPaddle.y += rightPaddle.dy;

    if (leftPaddle.y < 0) {
        leftPaddle.y = 0;
    } else if (leftPaddle.y + leftPaddle.height > canvas.height) {
        leftPaddle.y = canvas.height - leftPaddle.height;
    }

    if (rightPaddle.y < 0) {
        rightPaddle.y = 0;
    } else if (rightPaddle.y + rightPaddle.height > canvas.height) {
        rightPaddle.y = canvas.height - rightPaddle.height;
    }
}

function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.y + ball.size > canvas.height || ball.y < 0) {
        ball.dy *= -1;
    }

    if (ball.x + ball.size > canvas.width || ball.x < 0) {
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
        ball.dx *= -1;
    }

    if (
        (ball.x - ball.size < leftPaddle.x + leftPaddle.width &&
            ball.y > leftPaddle.y &&
            ball.y < leftPaddle.y + leftPaddle.height) ||
        (ball.x + ball.size > rightPaddle.x &&
            ball.y > rightPaddle.y &&
            ball.y < rightPaddle.y + rightPaddle.height)
    ) {
        ball.dx *= -1;
    }
}

function draw() {
    drawRect(0, 0, canvas.width, canvas.height, "#000");
    drawRect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height, "#fff");
    drawRect(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height, "#fff");
    drawCircle(ball.x, ball.y, ball.size, "#fff");
}

function update() {
    movePaddles();
    moveBall();
    draw();
}

function gameLoop() {
    update();
    requestAnimationFrame(gameLoop);
}

gameLoop();

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") {
        rightPaddle.dy = -5;
    } else if (e.key === "ArrowDown") {
        rightPaddle.dy = 5;
    }

    if (e.key === "w" || e.key === "W") {
        leftPaddle.dy = -5;
    } else if (e.key === "s" || e.key === "S") {
        leftPaddle.dy = 5;
    }
});

document.addEventListener("keyup", (e) => {
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        rightPaddle.dy = 0;
    }

    if (e.key === "w" || e.key === "W" || e.key === "s" || e.key === "S") {
        leftPaddle.dy = 0;
    }
});
