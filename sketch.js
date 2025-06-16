let red, green, blue;
let dragged = null;
let startTime;
let timeLimit = 10 * 1000; // 10 sekund
let currentRound = 1;
let maxRounds = 3;
let gameOver = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  startNewRound();
}

function draw() {
  background(255);

  if (gameOver) {
    fill(0);
    textSize(48);
    textAlign(CENTER, CENTER);
    text("Czas minął", width / 2, height / 2);

    window.location.href='https://kornelia2211.github.io/Scam_6/';
    return;
  }

  fill(0);
  textSize(28);
  textAlign(CENTER, TOP);
  text("Przeciągnij kolorowe figury na odpowiednie czarne obrysy", width / 2, 10);

  let cx = width / 2;
  let cy = height / 2;
  let s = 50;

  // Figury czarno-białe
  stroke(0);
  fill(255);
  rect(cx - 150 - s / 2, cy - s / 2, s, s);
  ellipse(cx, cy, s, s);
  triangle(cx + 150, cy - s / 2, cx + 125, cy + s / 2, cx + 175, cy + s / 2);

  noStroke();

  fill(255, 0, 0);
  rect(red.x, red.y, red.size, red.size);

  fill(0, 255, 0);
  ellipse(green.x, green.y, green.size);

  fill(0, 0, 255);
  triangle(
    blue.x, blue.y - blue.size / 2,
    blue.x - blue.size / 2, blue.y + blue.size / 2,
    blue.x + blue.size / 2, blue.y + blue.size / 2
  );

  checkCollisions(cx, cy, s);

  let elapsed = millis() - startTime;
  if (elapsed > timeLimit) {
    if (currentRound < maxRounds) {
      currentRound++;
      startNewRound();
    } else {
      gameOver = true;
    }
  }

  fill(0);
  textSize(24);
  textAlign(LEFT, TOP);
  let secondsLeft = Math.ceil((timeLimit - elapsed) / 1000);
  text("Runda: " + currentRound + " | Czas: " + max(0, secondsLeft), 20, 60);
}

function mousePressed() {
  if (gameOver) return;

  if (mouseX > red.x && mouseX < red.x + red.size &&
      mouseY > red.y && mouseY < red.y + red.size) {
    dragged = red;
  } else if (dist(mouseX, mouseY, green.x, green.y) < green.size / 2) {
    dragged = green;
  } else if (mouseX > blue.x - 25 && mouseX < blue.x + 25 &&
             mouseY > blue.y - 25 && mouseY < blue.y + 25) {
    dragged = blue;
  }
}

function mouseDragged() {
  if (gameOver) return;
  if (dragged) {
    dragged.x = mouseX;
    dragged.y = mouseY;
  }
}

function mouseReleased() {
  dragged = null;
}

function startNewRound() {
  red = { x: random(width - 50), y: random(height - 50), size: 50, type: "square" };
  green = { x: random(50, width - 50), y: random(50, height - 50), size: 50, type: "circle" };
  blue = { x: random(50, width - 50), y: random(50, height - 50), size: 50, type: "triangle" };
  startTime = millis();
}

function checkCollisions(cx, cy, s) {
  if (rectIntersect(red.x, red.y, red.size, red.size, cx - 150 - s / 2, cy - s / 2, s, s)) {
    red.x = random(width - red.size);
    red.y = random(height - red.size);
  }

  if (dist(green.x, green.y, cx, cy) < (green.size / 2 + s / 2)) {
    green.x = random(50, width - 50);
    green.y = random(50, height - 50);
  }

  let tX = cx + 150;
  let tY = cy;
  if (blue.x > tX - s / 2 && blue.x < tX + s / 2 &&
      blue.y > tY - s / 2 && blue.y < tY + s / 2) {
    blue.x = random(50, width - 50);
    blue.y = random(50, height - 50);
  }
}

function rectIntersect(x1, y1, w1, h1, x2, y2, w2, h2) {
  return !(x1 + w1 < x2 || x1 > x2 + w2 ||
           y1 + h1 < y2 || y1 > y2 + h2);
}
