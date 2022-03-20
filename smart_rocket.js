
class Rocket{
    constructor(x,y,thrusters,sequence,frameSpeed){
        this.x = x;
        this.y = y;
        this.w = 10;
        this.thrusters = thrusters
        this.sequence = sequence
        this.index = 0;
        this.frameSpeed = floor(frameSpeed);
        this.fit = -1000;
    }
    show(){
      ellipseMode(RADIUS);
      fill(255,255,255,100);
      if(this.fit>500){
          fill(0,255,255);
      }
      ellipse(this.x,this.y,this.w,this.w);
      let i = 0;
      for(var thruster of this.thrusters){
          let nThruster = thruster;
          mag = (nThruster[0]**2+nThruster[1]**2)**0.5;
          nThruster = [nThruster[0]/mag,nThruster[1]/mag]
          let tX = this.w*nThruster[0];
          let tY = this.w*nThruster[1];
          fill(255,0,0);
          if(i==this.index){
              fill(255,255,0);
          }
          ellipse(this.x+tX,this.y+tY,4,4);
          i++
      }
    }
    applyThrusters(){
        this.index = this.index % this.sequence.length;
        let currentThruster = this.sequence[this.index];
        this.applyForce(this.thrusters[currentThruster][0],this.thrusters[currentThruster][1]);
        if(frameCount%this.frameSpeed==0){
          this.index++;
        }
        if(fitness(this.x,this.y,destX,destY)>this.fit){
            this.fit = fitness(this.x,this.y,destX,destY);
        }
    }
    applyForce(xF,yF){
        this.x+=xF;
        this.y+=yF
    }
    nextGen(mutation){
        let x = random();
        let data = [this.thrusters,this.sequence,this.frameSpeed];
        for(let i = 0; i< data[0].length; i++){
            if(x<mutation/(this.thrusters.length)){
                data[0][i][0]+= random(-0.1,0.1);
                data[0][i][1]+= random(-0.1,0.1);
            }
            x = random();
        }
        for(let i = 0; i< data[1].length; i++){
            if(x<mutation/(2*this.sequence.length)){
                data[1][i] = floor(random(0, this.thrusters.length));
            }
            x = random();
        }
        x = random();
        if(x<mutation){
            data[2] = floor(data[2]+random(-2,2));
        }
        return data;
    }

}