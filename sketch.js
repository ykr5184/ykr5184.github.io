let myRockets = [];
let mutationChance = 0.2;
let destX;
let destY = 0;
function setup() {
    console.log('hi');
    createCanvas(windowWidth, windowHeight);
    destX = width/2;
    for(let i = 0; i<10; i++){
        let w = width/2;
        let h = height/2;
        let thrusters = [
            [random(-2,2),random(-2,2)],
            [random(-2,2),random(-2,2)],
            [random(-2,2),random(-2,2)]
        ];
        let seq = [
            floor(random(0,2.999)),
            floor(random(0,2.999)),
            floor(random(0,2.999)),
        ];
        let fs = random(8,12);
        myRocket = new Rocket(w,h,thrusters,seq,fs);
        myRockets.push(myRocket);
    }
    
}
  
function draw() {
    frameRate(20);
    background(0);
    for(let myRocket of myRockets){
        noStroke(); 
        myRocket.show();
        myRocket.applyThrusters();
    }
    fill(0,255,255)
    ellipse(destX,destY,20,20);

}

function fitness(posX,posY,tarX,tarY){
    return(600-dist(posX,posY,tarX,tarY)) + random(-0.1,0.05);
}

function makeChild(parentRocket){
    let data = parentRocket.nextGen(mutationChance);
    let childRocket = new Rocket(width/2,height/2,data[0],data[1],data[2]);
    return childRocket;
}
function newSpecies(someRockets){
    let fitnesses = [];
    let newPop = [];
    for(let someRocket of someRockets){
        fitnesses.push(someRocket.fit);
    }
    fitnesses.sort((a,b) => a-b);
    let median = fitnesses[Math.round((fitnesses.length)/2)];
    for(let someRocket of someRockets){
        if(someRocket.fit>=median){
            someRocket.x = width/2;
            someRocket.y = height/2;
            someRocket.fit = -1000;
            someRocket.index = 0;
            newPop.push(someRocket);
            newPop.push(makeChild(someRocket));
            
        }
    }
    return newPop;
}
function mousePressed(){
    for(let rocketDude of myRockets){
        print(rocketDude.fit);
    }
    print(newSpecies(myRockets).length);
    myRockets = newSpecies(myRockets);
    for(let rocketDude of myRockets){
        print(rocketDude.fit);
    }
}