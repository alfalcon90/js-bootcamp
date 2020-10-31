const { Engine, Render, Runner, World, Bodies, Body, Events } = Matter;

// Constants

const cellsX = 24;
const cellsY = 16;
const width = window.innerWidth - 4;
const height = window.innerHeight - 4;

const unitLengthX = width / cellsX;
const unitLengthY = height / cellsY;

// World Config

const engine = Engine.create();
engine.world.gravity.y = 0;
const { world } = engine;
const render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    wireframes: false,
    width,
    height,
  },
});
Render.run(render);
Runner.run(Runner.create(), engine);

// Walls

const walls = [
  Bodies.rectangle(width / 2, 0, width, 2, {
    isStatic: true,
    label: 'border',
  }),
  Bodies.rectangle(width / 2, height, width, 2, {
    isStatic: true,
    label: 'border',
  }),
  Bodies.rectangle(0, height / 2, 2, height, {
    isStatic: true,
    label: 'border',
  }),
  Bodies.rectangle(width, height / 2, 2, height, {
    isStatic: true,
    label: 'border',
  }),
];

World.add(world, walls);

// Maze Generation

const shuffle = (arr) => {
  let counter = arr.length;

  while (counter > 0) {
    const index = Math.floor(Math.random() * counter);

    counter--;

    const temp = arr[counter];
    arr[counter] = arr[index];
    arr[index] = temp;
  }
  return arr;
};

const grid = Array(cellsY)
  .fill(null)
  .map(() => Array(cellsX).fill(false));

const verticals = Array(cellsY)
  .fill(null)
  .map(() => Array(cellsX - 1).fill(false));

const horizontals = Array(cellsY - 1)
  .fill(null)
  .map(() => Array(cellsX).fill(false));

const startRow = Math.floor(Math.random() * cellsY);
const startColumn = Math.floor(Math.random() * cellsX);

const stepThroughCell = (row, column) => {
  // If I have visited the cell at [row, column], then return
  if (grid[row][column]) {
    return;
  }

  // Mark this cell as visited
  grid[row][column] = true;

  // Assemble randomly-ordered list of neighbors
  const neighbors = shuffle([
    [row - 1, column, 'up'],
    [row, column + 1, 'right'],
    [row + 1, column, 'down'],
    [row, column - 1, 'left'],
  ]);

  // For each neighbor...
  for (let neighbor of neighbors) {
    const [nextRow, nextColumn, direction] = neighbor;
    // See if that neighbor is out of bounds
    if (
      nextRow < 0 ||
      nextRow >= cellsY ||
      nextColumn < 0 ||
      nextColumn >= cellsX
    ) {
      continue;
    }
    // If we have visited that neighbor, continue to next neighbor
    if (grid[nextRow][nextColumn]) {
      continue;
    }

    // Remove a wall from either horizontals or verticals
    if (direction === 'left') {
      verticals[row][column - 1] = true;
    } else if (direction === 'right') {
      verticals[row][column] = true;
    } else if (direction === 'up') {
      horizontals[row - 1][column] = true;
    } else if (direction === 'down') {
      horizontals[row][column] = true;
    }

    // Visit that next cell
    stepThroughCell(nextRow, nextColumn);
  }
};

stepThroughCell(startRow, startColumn);

// Build walls

horizontals.forEach((row, rowIndex) => {
  row.forEach((open, columnIndex) => {
    if (open) {
      return;
    }
    const wall = Bodies.rectangle(
      columnIndex * unitLengthX + unitLengthX / 2,
      rowIndex * unitLengthY + unitLengthY,
      unitLengthX + 7,
      10,
      {
        isStatic: true,
        label: 'wall',
        render: {
          fillStyle: 'gray',
        },
      },
    );
    World.add(world, wall);
  });
});

verticals.forEach((row, rowIndex) => {
  row.forEach((open, columnIndex) => {
    if (open) {
      return;
    }
    const wall = Bodies.rectangle(
      columnIndex * unitLengthX + unitLengthX,
      rowIndex * unitLengthY + unitLengthY / 2,
      10,
      unitLengthY + 7,
      {
        isStatic: true,
        label: 'wall',
        render: {
          fillStyle: 'gray',
        },
      },
    );
    World.add(world, wall);
  });
});

// Create goal

const goal = Bodies.rectangle(
  width - unitLengthX / 2,
  height - unitLengthY / 2,
  unitLengthX / 2,
  unitLengthY / 2,
  {
    isStatic: true,
    label: 'goal',
    render: {
      fillStyle: '#16E07D',
    },
  },
);

World.add(world, goal);

// Create ball

const ballRadius = Math.min(unitLengthX, unitLengthY) / 4;
const ball = Bodies.circle(
  0 + unitLengthX / 2,
  0 + unitLengthY / 2,
  ballRadius,
  {
    label: 'ball',
    render: {
      fillStyle: '#FE4963',
    },
  },
);

World.add(world, ball);

// Move ball

document.addEventListener('keydown', (e) => {
  const { x, y } = ball.velocity;
  if (e.key === 'ArrowUp') {
    Body.setVelocity(ball, { x, y: y - 5 });
  }

  if (e.key === 'ArrowRight') {
    Body.setVelocity(ball, { x: x + 5, y });
  }

  if (e.key === 'ArrowDown') {
    Body.setVelocity(ball, { x, y: y + 5 });
  }

  if (e.key === 'ArrowLeft') {
    Body.setVelocity(ball, { x: -5, y });
  }
});

// Win Condition

Events.on(engine, 'collisionStart', (e) => {
  e.pairs.forEach((collision) => {
    const labels = ['ball', 'goal'];
    if (
      labels.includes(collision.bodyA.label) &&
      labels.includes(collision.bodyB.label)
    ) {
      document.querySelector('#winner').classList.remove('hidden');
      world.gravity.y = 1;
      world.bodies.forEach((body) => {
        if (body.label === 'wall') {
          Body.setStatic(body, false);
        }
      });
    }
  });
});
