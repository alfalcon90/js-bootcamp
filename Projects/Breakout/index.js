const rulesBtn = document.querySelector('#rules-btn');
const closeBtn = document.querySelector('#close-btn');
const rules = document.querySelector('#rules');
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

let score = 0;

const brickRowCount = 9;
const brickColCount = 5;

// Create ball props
const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 12,
  speed: 2.5,
  dx: 2.5,
  dy: -2.5,
};

// Create paddle props
const paddle = {
  x: canvas.width / 2 - 40,
  y: canvas.height - 32,
  width: 80,
  height: 8,
  speed: 8,
  dx: 0,
};

// Create brick props
const brickProps = {
  width: 72,
  height: 24,
  padding: 12,
  offsetX: 30,
  offsetY: 64,
  visible: true,
};

// Draw ball
const drawBall = () => {
  ctx.beginPath();

  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
  ctx.fillStyle = '#16e07d';
  ctx.fill();
  ctx.closePath();
};

// Draw paddle
const drawPaddle = () => {
  ctx.beginPath();

  ctx.rect(paddle.x, paddle.y, paddle.width, paddle.height);
  ctx.fillStyle = '#16e07d';
  ctx.fill();
  ctx.closePath();
};

// Draw score
const drawScore = () => {
  ctx.font = '20px Lato';
  ctx.fillText(`Score: ${score}`, canvas.width - 100, 40);
};

// Draw bricks
const bricks = [];
for (let i = 0; i < brickRowCount; i++) {
  bricks[i] = [];
  for (let j = 0; j < brickColCount; j++) {
    const x = i * (brickProps.width + brickProps.padding) + brickProps.offsetX;
    const y = j * (brickProps.height + brickProps.padding) + brickProps.offsetY;
    bricks[i][j] = { x, y, ...brickProps };
  }
}

const drawBricks = () => {
  bricks.forEach((column) => {
    column.forEach((brick) => {
      ctx.beginPath();
      ctx.rect(brick.x, brick.y, brick.width, brick.height);
      ctx.fillStyle = brick.visible ? '#1f262e' : 'transparent';
      ctx.fill();
      ctx.closePath();
    });
  });
};

// Move paddle
const movePaddle = () => {
  paddle.x += paddle.dx;

  // Wall collision
  if (paddle.x + paddle.width > canvas.width) {
    paddle.x = canvas.width - paddle.width;
  }

  if (paddle.x < 0) {
    paddle.x = 0;
  }
};

// Paddle control
const keyDown = (e) => {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    paddle.dx = paddle.speed;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    paddle.dx = -paddle.speed;
  }
};

const keyUp = (e) => {
  if (
    e.key === 'Right' ||
    e.key === 'ArrowRight' ||
    e.key === 'Left' ||
    e.key === 'ArrowLeft'
  ) {
    paddle.dx = 0;
  }
};

// Move ball
const moveBall = () => {
  ball.x += ball.dx;
  ball.y += ball.dy;

  // Wall collision
  if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
    ball.dx *= -1; // same as ball.dx = ball.dx * -1
  }
  if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
    ball.dy *= -1;
  }

  // Paddle collision
  if (
    ball.x - ball.size > paddle.x &&
    ball.x + ball.size < paddle.x + paddle.width &&
    ball.y + ball.size > paddle.y
  ) {
    ball.dy = -ball.speed;
  }

  // Bricks collision
  bricks.forEach((column) => {
    column.forEach((brick) => {
      if (brick.visible) {
        if (
          ball.x - ball.size > brick.x && // left brick side check
          ball.x + ball.size < brick.x + brick.width && // right brick side check
          ball.y + ball.size > brick.y && // top brick side check
          ball.y - ball.size < brick.y + brick.height // bottom brick side check
        ) {
          ball.dy *= -1;
          brick.visible = false;
          increaseScore();
        }
      }
    });
  });

  // Bottom wall collision
  if (ball.y + ball.size > canvas.height) {
    showAllBricks();
    score = 0;
  }
};

// Increase score
const increaseScore = () => {
  score++;

  if (score % (brickRowCount * brickColCount) === 0) {
    showAllBricks();
  }
};

// Make all bricks appear
const showAllBricks = () => {
  bricks.forEach((column) => {
    column.forEach((brick) => {
      brick.visible = true;
    });
  });
};

// Event Listeners
rulesBtn.addEventListener('click', () => {
  rules.classList.add('show');
});

closeBtn.addEventListener('click', () => {
  rules.classList.remove('show');
});
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

// Init
const draw = () => {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();
  drawScore();
  drawBricks();
};

const update = () => {
  draw();
  moveBall();
  movePaddle();
  requestAnimationFrame(update);
};

update();
