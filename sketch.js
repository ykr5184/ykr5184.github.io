let fc;
let unit = 1;
function setup() {
    createCanvas(windowWidth, windowWidth);
    rectMode(CENTER);
    ellipseMode(CENTER);
    frameRate(30);
    unit = windowWidth/400;
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
    drawTree(50*unit, -60*unit, -40*unit, 0*unit, -50*unit);
    for (let i = 1; i < n; i++) {
        drawTree(50*unit, -60*unit, -40*unit,  70 * i*unit, -50*unit);
        drawTree(50*unit, -60*unit, -40*unit, -70 * i*unit, -50*unit);
    }
}
function drawBoxLid(rot, traX, traY, framesPassed) {
    fcc = frameCount % 430 - framesPassed
    push();
    translate(width / 2, height / 2);
    fill(255, 50, 100);
    rotate(rot * fcc);
    translate(traX * fcc, traY * fcc)
    rect(0, 0, 220*unit, 50*unit);
    noFill();
    stroke(255, 0, 0);
    rotate(PI / 12);
    ellipse(-45*unit, -33*unit, 80*unit, 30*unit);
    rotate(-PI / 6);
    ellipse(45*unit, -33*unit, 80*unit, 30*unit);
    pop();
}
function drawBoxLidReturn(traY) {
    push();
    translate(width / 2, height / 2);
    translate(0, traY);
    fill(255, 50, 100);
    rect(0, 0, 220*unit, 50*unit);
    noFill();
    stroke(255, 0, 0);
    rotate(PI / 12);
    ellipse(-45*unit, -33*unit, 80*unit, 30*unit);
    rotate(-PI / 6);
    ellipse(45*unit, -33*unit, 80*unit, 30*unit);
    pop();
}
function drawBoxBody() {
    push();
    translate(width / 2, height / 2);
    fill(255, 0, 0);
    rect(0, 100*unit, 200*unit, 150*unit);
    noStroke();
    fill(0, 150, 11);
    rect(0, 100*unit, 20*unit, 148*unit);
    rect(0, 100*unit, 198*unit, 20*unit);
    pop();
}
function drawSnowmanCard(x, y, sc) {
    push();
    translate(x, y);
    translate(-50*unit, 0);
    scale(sc, 1);
    translate(50*unit, 0);
    fill(0, 200, 200);
    rect(0, 0, 100*unit, 100*unit);
    fill(255, 255, 255);
    noStroke();
    ellipse(0, -25*unit, 25*unit);
    ellipse(0, 0, 30*unit);
    ellipse(0, 25*unit, 35*unit);
    fill(0, 0, 0);
    ellipse(-4*unit, -28*unit, 3*unit);
    ellipse(4*unit, -28*unit, 3*unit);
    ellipse(-4*unit, -18*unit, 2*unit);
    ellipse(-1.5*unit, -16*unit, 2*unit);
    ellipse(1.5*unit, -16*unit, 2*unit);
    ellipse(4*unit, -18*unit, 2*unit);
    ellipse(0, 0, 5*unit);
    ellipse(0, 14*unit, 5*unit);
    ellipse(0, 28*unit, 5*unit);
    fill(200, 100, 0);
    ellipse(0, -22*unit, 3*unit);
    stroke(0);
    line(-15*unit, 0, -25*unit, -5*unit);
    line(15*unit, 0, 25*unit, -5*unit);
    line(-5*unit, 42*unit, -8*unit, 45*unit);
    line(5*unit, 42*unit, 8*unit, 45*unit);
    fill(0, 0, 0);
    rect(0, -35*unit, 25*unit, 4*unit);
    rect(0, -40*unit, 20*unit, 10*unit);
    pop();
}
function drawMessageCard() {
    push();
    translate(width / 2, height / 2 - 50*unit);
    fill(191, 174, 217);
    rect(0, 0, 100*unit, 100*unit);
    fill(0);
    textSize(8*sqrt(unit));
    textAlign(LEFT);
    text("Dear அப்பா and அம்மா", -40*unit, -30*unit);
    textSize(12*sqrt(unit));
    textAlign(CENTER);
    fill(0, 120, 0);
    text("Merry Christmas!", 0, 0);
    fill(0);
    textAlign(LEFT);
    textSize(8*sqrt(unit));
    text("From Yuvan!", -40*unit, 30*unit);
    pop();
}
function drawBlankCard(sc) {
    push();
    translate(width / 2 - 100*unit, height / 2 - 50*unit);
    translate(50*unit, 0);
    scale(sc, 1)
    translate(-50*unit, 0);
    fill(191, 174, 217)
    rect(0, 0, 100*unit, 100*unit);
    pop();
}
function draw() {
    background(255);
    drawTrees(5);
    fc = frameCount % 430;
    if (fc < 75) {
        drawBoxLid(0, 0, 0, 0)

    } else if (fc < 95) {
        drawBoxLid(PI / 120, 5*unit, -5*unit, 75);

    } else if (fc < 115) {
        drawBoxLid(PI / 120, 5*unit, -5*unit, 75);
        drawSnowmanCard(width / 2, height / 2 + (75 - 125 / 80 * (fc - 95))*unit, 1);

    } else if (fc < 175) {
        drawSnowmanCard(width / 2, height / 2 + (75 - 125 / 80 * (fc - 95))*unit, 1);

    } else if (fc < 205) {
        drawMessageCard();
        drawSnowmanCard(width / 2, height / 2 - 50*unit, sqrt(1 - (fc - 175) ** 2 / 900));

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
        drawSnowmanCard(width / 2, height / 2 - 50*unit, sqrt(1 - (330 - fc) ** 2 / 900));
    } else if (fc < 390) {
        drawSnowmanCard(width / 2, height / 2 + (75 - 125 / 80 * (410 - fc))*unit, 1);
    } else if (fc < 410) {
        //drawBoxLid(-PI/120,-5,5,390,true);
        drawBoxLidReturn(-5 * (430 - fc)*unit)
        drawSnowmanCard(width / 2, height / 2 + (75 - 125 / 80 * (410 - fc))*unit, 1);
    } else if (fc < 430) {
        //drawBoxLid(-PI/120,-5,5,390,true);
        drawBoxLidReturn(-5 * (430 - fc)*unit);
    }
    drawBoxBody();



}
