function setup() {
    createCanvas(400, 400);
    rectMode(CENTER);
    ellipseMode(CENTER);
    frameRate(30);
    let fc;
}
function drawTree(x, y, d, ox, oy) {
    push()
    translate(width / 2 + ox, height / 2 + oy)
    fill(80, 255, 80);
    noStroke();
    triangle(0, y - d, -x, -2 * d, x, -2 * d);
    triangle(0, y, -x, -d, x, -d);
    triangle(0, y + d, -x, 0, x, 0);

    stroke(255);
    fill(0, 0, 0, 0);
    beginShape();
    vertex(-x, -2 * d);
    vertex(x, -2 * d);
    vertex(x * y / (y + d), -d);
    vertex(x, -d);
    vertex(x * y / (y + d), 0);
    vertex(x, 0);
    vertex(0, y + d);
    vertex(-x, 0);
    vertex(-x * y / (y + d), 0);
    vertex(-x, -d);
    vertex(-x * y / (y + d), -d);
    endShape(CLOSE);
    fill(255, 100, 0);

    rect(0, y - 4 * d, x / 2, d);
    pop()
}
function drawTrees(n) {
    drawTree(50, -60, -40, 0, -50);
    for (let i = 1; i < n; i++) {
        drawTree(50, -60, -40, 70 * i, -50);
        drawTree(50, -60, -40, -70 * i, -50);
    }
}
function drawBoxLid(rot, traX, traY, framesPassed) {
    fcc = frameCount % 430 - framesPassed
    push();
    translate(width / 2, height / 2);
    fill(255, 50, 100);
    rotate(rot * fcc);
    translate(traX * fcc, traY * fcc)
    rect(0, 0, 220, 50);
    noFill();
    stroke(255, 0, 0);
    rotate(PI / 12);
    ellipse(-45, -33, 80, 30);
    rotate(-PI / 6);
    ellipse(45, -33, 80, 30);
    pop();
}
function drawBoxLidReturn(traY) {
    push();
    translate(width / 2, height / 2);
    translate(0, traY);
    fill(255, 50, 100);
    rect(0, 0, 220, 50);
    noFill();
    stroke(255, 0, 0);
    rotate(PI / 12);
    ellipse(-45, -33, 80, 30);
    rotate(-PI / 6);
    ellipse(45, -33, 80, 30);
    pop();
}
function drawBoxBody() {
    push();
    translate(width / 2, height / 2);
    fill(255, 0, 0);
    rect(0, 100, 200, 150);
    noStroke();
    fill(0, 150, 11);
    rect(0, 100, 20, 148);
    rect(0, 100, 198, 20);
    pop();
}
function drawSnowmanCard(x, y, sc) {
    push();
    translate(x, y);
    translate(-50, 0);
    scale(sc, 1);
    translate(50, 0);
    fill(0, 200, 200);
    rect(0, 0, 100, 100);
    fill(255, 255, 255);
    noStroke();
    ellipse(0, -25, 25);
    ellipse(0, 0, 30);
    ellipse(0, 25, 35);
    fill(0, 0, 0);
    ellipse(-4, -28, 3);
    ellipse(4, -28, 3);
    ellipse(-4, -18, 2);
    ellipse(-1.5, -16, 2);
    ellipse(1.5, -16, 2);
    ellipse(4, -18, 2);
    ellipse(0, 0, 5);
    ellipse(0, 14, 5);
    ellipse(0, 28, 5);
    fill(200, 100, 0);
    ellipse(0, -22, 3);
    stroke(0);
    line(-15, 0, -25, -5);
    line(15, 0, 25, -5);
    line(-5, 42, -8, 45);
    line(5, 42, 8, 45);
    fill(0, 0, 0);
    rect(0, -35, 25, 4);
    rect(0, -40, 20, 10);
    pop();
}
function drawMessageCard() {
    push();
    translate(width / 2, height / 2 - 50);
    fill(191, 174, 217);
    rect(0, 0, 100, 100);
    fill(0);
    textSize(8);
    textAlign(LEFT);
    text("Dear அப்பா and அம்மா", -40, -30);
    textSize(12);
    textAlign(CENTER);
    fill(0, 120, 0);
    text("Merry Christmas!", 0, 0);
    fill(0);
    textAlign(LEFT);
    textSize(8);
    text("From Yuvan!", -40, 30);
    pop();
}
function drawBlankCard(sc) {
    push();
    translate(width / 2 - 100, height / 2 - 50);
    translate(50, 0);
    scale(sc, 1)
    translate(-50, 0);
    fill(191, 174, 217)
    rect(0, 0, 100, 100);
    pop();
}
function draw() {
    background(255);
    drawTrees(5);
    fc = frameCount % 430;
    if (fc < 75) {
        drawBoxLid(0, 0, 0, 0)

    } else if (fc < 95) {
        drawBoxLid(PI / 120, 5, -5, 75);

    } else if (fc < 115) {
        drawBoxLid(PI / 120, 5, -5, 75);
        drawSnowmanCard(width / 2, height / 2 + 75 - 125 / 80 * (fc - 95), 1);

    } else if (fc < 175) {
        drawSnowmanCard(width / 2, height / 2 + 75 - 125 / 80 * (fc - 95), 1);

    } else if (fc < 205) {
        drawMessageCard();
        drawSnowmanCard(width / 2, height / 2 - 50, sqrt(1 - (fc - 175) ** 2 / 900));

    } else if (fc < 235) {
        drawMessageCard();
        drawBlankCard(sqrt(1 - (235 - fc) ** 2 / 900))

    } else if (fc < 270) {
        drawMessageCard();
        drawBlankCard(1);

    } else if (fc < 300) {
        drawMessageCard();
        drawBlankCard(sqrt(1 - (fc - 270) ** 2 / 900))
    } else if (fc < 330) {
        drawMessageCard();
        drawSnowmanCard(width / 2, height / 2 - 50, sqrt(1 - (330 - fc) ** 2 / 900));
    } else if (fc < 390) {
        drawSnowmanCard(width / 2, height / 2 + 75 - 125 / 80 * (410 - fc), 1);
    } else if (fc < 410) {
        //drawBoxLid(-PI/120,-5,5,390,true);
        drawBoxLidReturn(-5 * (430 - fc))
        drawSnowmanCard(width / 2, height / 2 + 75 - 125 / 80 * (410 - fc), 1);
    } else if (fc < 430) {
        //drawBoxLid(-PI/120,-5,5,390,true);
        drawBoxLidReturn(-5 * (430 - fc));
    }
    drawBoxBody();



}
