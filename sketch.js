let MODE;

let innerPlanets;
let outerPlanets;
let hfont;
let M4_dim;
let M11_sel = 0;
let M11_opt = [];
let M15_ref;
let startf;
let hdurl;
let req = new XMLHttpRequest();
let url = "https://api.nasa.gov/planetary/apod?api_key=";
let api_key = "yxaohBWFHD8y9bn6V45S7V9RsjdaK7gY6zV4SAzA";


function preload() {
  hfont = loadFont("helvetica.otf");
  anglePluto = loadImage("AnglePluto.png");
  angleExo = loadImage("AngleExo.png");
  keplerSolar = loadImage("KeplerSolar.png");
  keplerExo = loadImage("KeplerExo.png");
  req.open("GET",url+api_key);
req.send();
req.addEventListener("load", function(){
  if(req.status==200 && req.readyState==4){
    let response = JSON.parse(req.responseText);
    console.log(response.title);
    console.log(response);
    hdurl = response.hdurl;
    console.log(hdurl);
  }
})
  
  
  apod = loadImage("apod.jpeg");
}
function setup() {
  
  
  createCanvas(400, 400, WEBGL);
  defaultCamera = createCamera();
  freeCam = createCamera();
  icam = createCamera();
  icam.eyeX = -50;
  icam.eyeY = 166;
  icam.eyeZ = 766;
  icam.centerX = 0;
  icam.centerY = 0;
  icam.centerZ = 0;
  icam.tilt(0);
  ocam = createCamera();
  ocam.eyeX = -50;
  ocam.eyeY = 50;
  ocam.eyeZ = 600;
  ocam.centerX = 0;
  ocam.centerY = 0;
  ocam.centerZ = 0;
  ocam.tilt(0);
  ecam = createCamera();
  ecam.eyeX = -200;
  ecam.eyeY = 166;
  ecam.eyeZ = 656;
  ecam.centerX = 0;
  ecam.centerY = 0;
  ecam.centerZ = 0;
  ecam.tilt(0);
  MODE = 0;
  innerPlanets = [
    {
      name: "Mercury",
      a: 0.3871,
      e: 0.206,
      T: 0.2408,
      beta: 7.0,
      col: "lime",
      start: random(2 * PI),
    },
    {
      name: "Venus",
      a: 0.7233,
      e: 0.007,
      T: 0.6152,
      beta: 3.39,
      col: "cyan",
      start: random(2 * PI),
    },
    {
      name: "Earth",
      a: 1.0,
      e: 0.017,
      T: 1.0,
      beta: 0.0,
      col: "orange",
      start: random(2 * PI),
    },
    {
      name: "Mars",
      a: 1.5273,
      e: 0.093,
      T: 1.8809,
      beta: 1.85,
      col: "salmon",
      start: random(2 * PI),
    },
  ];
  outerPlanets = [
    {
      name: "Jupiter",
      a: 5.2028,
      e: 0.048,
      T: 11.862,
      beta: 1.31,
      col: "pink",
      start: random(2 * PI),
    },
    {
      name: "Saturn",
      a: 9.5388,
      e: 0.056,
      T: 29.458,
      beta: 2.49,
      col: "orchid",
      start: random(2 * PI),
    },
    {
      name: "Uranus",
      a: 19.1914,
      e: 0.046,
      T: 84.01,
      beta: 0.77,
      col: "purple",
      start: random(2 * PI),
    },
    {
      name: "Neptune",
      a: 30.0611,
      e: 0.01,
      T: 164.79,
      beta: 1.77,
      col: "deeppink",
      start: random(2 * PI),
    },
    {
      name: "Pluto",
      a: 39.5294,
      e: 0.248,
      T: 248.54,
      beta: 17.15,
      col: "fuchsia",
      start: random(2 * PI),
    },
  ];
  exoPlanets = [
    {
      name: "K-90b",
      a: 0.074,
      e: 0,
      T: 7.0,
      beta: 0.2,
      col: "lime",
      start: random(2 * PI),
    },
    {
      name: "K-90c",
      a: 0.089,
      e: 0,
      T: 8.72,
      beta: 0.48,
      col: "forestgreen",
      start: random(2 * PI),
    },
    {
      name: "K-90i",
      a: 0.107,
      e: 0,
      T: 14.5,
      beta: 0.0,
      col: "darkgreen",
      start: random(2 * PI),
    },
    {
      name: "K-90d",
      a: 0.32,
      e: 0,
      T: 59.7,
      beta: 0.51,
      col: "lightgreen",
      start: random(2 * PI),
    },
    {
      name: "K-90e",
      a: 0.42,
      e: 0,
      T: 91.9,
      beta: 0.59,
      col: "aquamarine",
      start: random(2 * PI),
    },
    {
      name: "K-90f",
      a: 0.48,
      e: 0.01,
      T: 124.9,
      beta: 0.57,
      col: "turquoise",
      start: random(2 * PI),
    },
    {
      name: "K-90g",
      a: 0.71,
      e: 0.049,
      T: 210.6,
      beta: 0.72,
      col: "lightblue",
      start: random(2 * PI),
    },
    {
      name: "K-90h",
      a: 1.01,
      e: 0.011,
      T: 331,
      beta: 0.727,
      col: "skyblue",
      start: random(2 * PI),
    },
  ];
  allPlanets = innerPlanets.concat(outerPlanets, exoPlanets);
  textFont(hfont);
  fill("green");
  buttons = [
    {
      col: "#dfc0f0",
      b: createButton("Kepler's 3rd Law"),
      pos: [120, 100],
      size: 50,
      vis: false,
      modes: [0],
      fun: function () {
        if (buttons[0].vis) {
          MODE = 1;
        }
      },
    },
    {
      col: "#dfc0f0",
      b: createButton("2d Orbits"),
      pos: [280, 100],
      size: 50,
      vis: false,
      modes: [0],
      fun: function () {
        if (buttons[1].vis) {
          MODE = 4;
          M4_dim = 2;
        }
      },
    },
    {
      col: "#dfc0f0",
      b: createButton("3d Orbits"),
      pos: [120, 200],
      size: 50,
      vis: false,
      modes: [0],
      fun: function () {
        if (buttons[2].vis) {
          MODE = 4;
          M4_dim = 3;
        }
      },
    },
    {
      col: "#dfc0f0",
      b: createButton("Angle Graphs"),
      pos: [280, 200],
      size: 50,
      vis: false,
      modes: [0],
      fun: function () {
        if (buttons[3].vis) {
          MODE = 8;
        }
      },
    },
    {
      col: "#dfc0f0",
      b: createButton("Spirograph"),
      pos: [120, 300],
      size: 50,
      vis: false,
      modes: [0],
      fun: function () {
        if (buttons[4].vis) {
          MODE = 11;
        }
      },
    },
    {
      col: "#dfc0f0",
      b: createButton("Ptolemaic Model"),
      pos: [280, 300],
      size: 50,
      vis: false,
      modes: [0],
      fun: function () {
        if (buttons[5].vis) {
          MODE = 15;
        }
      },
    },
    {
      col: "blue",
      b: createButton("Solar System"),
      pos: [200, 150],
      size: 80,
      vis: false,
      modes: [1],
      fun: function () {
        if (buttons[6].vis) {
          MODE = 2;
        }
      },
    },
    {
      col: "hotpink",
      b: createButton("Exoplanetary System"),
      pos: [200, 300],
      size: 80,
      vis: false,
      modes: [1],
      fun: function () {
        if (buttons[7].vis) {
          MODE = 3;
        }
      },
    },
    {
      col: "grey",
      b: createButton("Return to Home"),
      pos: [50, 375],
      size: 50,
      vis: false,
      modes: [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        100
      ],
      fun: function () {
        if (buttons[8].vis) {
          MODE = 0;
        }
      },
    },
    {
      col: "grey",
      b: createButton("Return to Options"),
      pos: [350, 375],
      size: 50,
      vis: false,
      modes: [2, 3, 5, 6, 7, 9, 10, 12, 13, 14, 16, 17, 18, 19, 20, 21,100],
      fun: function () {
        if (buttons[9].vis) {
          if (MODE == 2 || MODE == 3) {
            MODE = 1;
          }
          if (MODE == 5 || MODE == 6 || MODE == 7) {
            MODE = 4;
          }
          if (MODE == 9 || MODE == 10) {
            MODE = 8;
          }
          if (MODE == 12 || MODE == 13 || MODE == 14) {
            MODE = 11;
          }
          if (
            MODE == 16 ||
            MODE == 17 ||
            MODE == 18 ||
            MODE == 19 ||
            MODE == 20 ||
            MODE == 21 ||
            MODE == 100 
          ) {
            MODE = 15;
          }
        }
      },
    },
    {
      col: "blue",
      b: createButton("Inner Solar System"),
      pos: [100, 100],
      size: 50,
      vis: false,
      modes: [4],
      fun: function () {
        if (buttons[10].vis) {
          MODE = 5;
          
        }
      },
    },
    {
      col: "green",
      b: createButton("Outer Solar System"),
      pos: [300, 100],
      size: 50,
      vis: false,
      modes: [4],
      fun: function () {
        if (buttons[11].vis) {
          MODE = 6;
          
        }
      },
    },
    {
      col: "hotpink",
      b: createButton("Exoplanetary System"),
      pos: [200, 250],
      size: 50,
      vis: false,
      modes: [4],
      fun: function () {
        if (buttons[12].vis) {
          MODE = 7;
          
        }
      },
    },
    {
      col: "blue",
      b: createButton("Pluto"),
      pos: [200, 150],
      size: 80,
      vis: false,
      modes: [8],
      fun: function () {
        if (buttons[13].vis) {
          MODE = 9;
        }
      },
    },
    {
      col: "hotpink",
      b: createButton("Exoplanet"),
      pos: [200, 300],
      size: 80,
      vis: false,
      modes: [8],
      fun: function () {
        if (buttons[14].vis) {
          MODE = 10;
        }
      },
    },
    {
      col: "blue",
      b: createButton("Solar System"),
      pos: [200, 150],
      size: 80,
      vis: false,
      modes: [11],
      fun: function () {
        if (buttons[15].vis) {
          MODE = 12;
        }
      },
    },
    {
      col: "hotpink",
      b: createButton("Exoplanetary System"),
      pos: [200, 300],
      size: 80,
      vis: false,
      modes: [11],
      fun: function () {
        if (buttons[16].vis) {
          MODE = 13;
        }
      },
    },
    {
      col: "lime",
      b: createButton("Mercury"),
      pos: [70, 100],
      size: 50,
      vis: false,
      modes: [12],
      fun: function () {
        if (buttons[17].vis) {
          buttons[17].b.style("background-color", "red");
          if (M11_sel == 0) {
            M11_sel += 1;
            M11_opt = [0];
          }
          if (M11_sel == 1 && !M11_opt.includes(0)) {
            M11_sel -= 1;
            M11_opt.push(0);
            MODE = 14;
            startf = frameCount;
            clear();
          }
        }
      },
    },
    {
      col: "cyan",
      b: createButton("Venus"),
      pos: [200, 100],
      size: 50,
      vis: false,
      modes: [12],
      fun: function () {
        if (buttons[18].vis) {
          buttons[18].b.style("background-color", "red");
          if (M11_sel == 0) {
            M11_sel += 1;
            M11_opt = [1];
          }
          if (M11_sel == 1 && !M11_opt.includes(1)) {
            M11_sel -= 1;
            M11_opt.push(1);
            MODE = 14;
            startf = frameCount;
            clear();
          }
        }
      },
    },
    {
      col: "orange",
      b: createButton("Earth"),
      pos: [330, 100],
      size: 50,
      vis: false,
      modes: [12],
      fun: function () {
        if (buttons[19].vis) {
          buttons[19].b.style("background-color", "red");
          if (M11_sel == 0) {
            M11_sel += 1;
            M11_opt = [2];
          }
          if (M11_sel == 1 && !M11_opt.includes(2)) {
            M11_sel -= 1;
            M11_opt.push(2);
            MODE = 14;
            startf = frameCount;
            clear();
          }
        }
      },
    },
    {
      col: "salmon",
      b: createButton("Mars"),
      pos: [70, 200],
      size: 50,
      vis: false,
      modes: [12],
      fun: function () {
        if (buttons[20].vis) {
          buttons[20].b.style("background-color", "red");
          if (M11_sel == 0) {
            M11_sel += 1;
            M11_opt = [3];
          }
          if (M11_sel == 1 && !M11_opt.includes(3)) {
            M11_sel -= 1;
            M11_opt.push(3);
            MODE = 14;
            startf = frameCount;
            clear();
          }
        }
      },
    },
    {
      col: "pink",
      b: createButton("Jupiter"),
      pos: [200, 200],
      size: 50,
      vis: false,
      modes: [12],
      fun: function () {
        if (buttons[21].vis) {
          buttons[21].b.style("background-color", "red");
          if (M11_sel == 0) {
            M11_sel += 1;
            M11_opt = [4];
          }
          if (M11_sel == 1 && !M11_opt.includes(4)) {
            M11_sel -= 1;
            M11_opt.push(4);
            MODE = 14;
            startf = frameCount;
            clear();
          }
        }
      },
    },
    {
      col: "orchid",
      b: createButton("Saturn"),
      pos: [330, 200],
      size: 50,
      vis: false,
      modes: [12],
      fun: function () {
        if (buttons[22].vis) {
          buttons[22].b.style("background-color", "red");
          if (M11_sel == 0) {
            M11_sel += 1;
            M11_opt = [5];
          }
          if (M11_sel == 1 && !M11_opt.includes(5)) {
            M11_sel -= 1;
            M11_opt.push(5);
            MODE = 14;
            startf = frameCount;
            clear();
          }
        }
      },
    },
    {
      col: "purple",
      b: createButton("Uranus"),
      pos: [70, 300],
      size: 50,
      vis: false,
      modes: [12],
      fun: function () {
        if (buttons[23].vis) {
          buttons[23].b.style("background-color", "red");
          if (M11_sel == 0) {
            M11_sel += 1;
            M11_opt = [6];
          }
          if (M11_sel == 1 && !M11_opt.includes(6)) {
            M11_sel -= 1;
            M11_opt.push(6);
            MODE = 14;
            startf = frameCount;
            clear();
          }
        }
      },
    },
    {
      col: "deeppink",
      b: createButton("Neptune"),
      pos: [200, 300],
      size: 50,
      vis: false,
      modes: [12],
      fun: function () {
        if (buttons[24].vis) {
          buttons[24].b.style("background-color", "red");
          if (M11_sel == 0) {
            M11_sel += 1;
            M11_opt = [7];
          }
          if (M11_sel == 1 && !M11_opt.includes(7)) {
            M11_sel -= 1;
            M11_opt.push(7);
            MODE = 14;
            startf = frameCount;
            clear();
          }
        }
      },
    },
    {
      col: "fuchsia",
      b: createButton("Pluto"),
      pos: [330, 300],
      size: 50,
      vis: false,
      modes: [12],
      fun: function () {
        if (buttons[25].vis) {
          buttons[25].b.style("border-color", "red");
          if (M11_sel == 0) {
            M11_sel += 1;
            M11_opt = [8];
          }
          if (M11_sel == 1 && !M11_opt.includes(8)) {
            M11_sel -= 1;
            M11_opt.push(8);
            MODE = 14;
            startf = frameCount;
          }
          clear();
        }
      },
    },
    {
      col: "lime",
      b: createButton("K-90b"),
      pos: [70, 100],
      size: 50,
      vis: false,
      modes: [13],
      fun: function () {
        if (buttons[26].vis) {
          buttons[26].b.style("background-color", "red");
          if (M11_sel == 0) {
            M11_sel += 1;
            M11_opt = [9];
          }
          if (M11_sel == 1 && !M11_opt.includes(9)) {
            M11_sel -= 1;
            M11_opt.push(9);
            MODE = 14;
            startf = frameCount;
            clear();
          }
        }
      },
    },
    {
      col: "forestgreen",
      b: createButton("K-90c"),
      pos: [200, 100],
      size: 50,
      vis: false,
      modes: [13],
      fun: function () {
        if (buttons[27].vis) {
          buttons[27].b.style("background-color", "red");
          if (M11_sel == 0) {
            M11_sel += 1;
            M11_opt = [10];
          }
          if (M11_sel == 1 && !M11_opt.includes(10)) {
            M11_sel -= 1;
            M11_opt.push(10);
            MODE = 14;
            startf = frameCount;
            clear();
          }
        }
      },
    },
    {
      col: "darkgreen",
      b: createButton("K-90i"),
      pos: [330, 100],
      size: 50,
      vis: false,
      modes: [13],
      fun: function () {
        if (buttons[28].vis) {
          buttons[28].b.style("background-color", "red");
          if (M11_sel == 0) {
            M11_sel += 1;
            M11_opt = [11];
          }
          if (M11_sel == 1 && !M11_opt.includes(11)) {
            M11_sel -= 1;
            M11_opt.push(11);
            MODE = 14;
            startf = frameCount;
            clear();
          }
        }
      },
    },
    {
      col: "lightgreen",
      b: createButton("K-90d"),
      pos: [70, 200],
      size: 50,
      vis: false,
      modes: [13],
      fun: function () {
        if (buttons[29].vis) {
          buttons[29].b.style("background-color", "red");
          if (M11_sel == 0) {
            M11_sel += 1;
            M11_opt = [12];
          }
          if (M11_sel == 1 && !M11_opt.includes(12)) {
            M11_sel -= 1;
            M11_opt.push(12);
            MODE = 14;
            startf = frameCount;
            clear();
          }
        }
      },
    },
    {
      col: "aquamarine",
      b: createButton("K-90e"),
      pos: [200, 200],
      size: 50,
      vis: false,
      modes: [13],
      fun: function () {
        if (buttons[30].vis) {
          buttons[30].b.style("background-color", "red");
          if (M11_sel == 0) {
            M11_sel += 1;
            M11_opt = [13];
          }
          if (M11_sel == 1 && !M11_opt.includes(13)) {
            M11_sel -= 1;
            M11_opt.push(13);
            MODE = 14;
            startf = frameCount;
            clear();
          }
        }
      },
    },
    {
      col: "turquoise",
      b: createButton("K-90f"),
      pos: [330, 200],
      size: 50,
      vis: false,
      modes: [13],
      fun: function () {
        if (buttons[31].vis) {
          buttons[31].b.style("background-color", "red");
          if (M11_sel == 0) {
            M11_sel += 1;
            M11_opt = [14];
          }
          if (M11_sel == 1 && !M11_opt.includes(14)) {
            M11_sel -= 1;
            M11_opt.push(14);
            MODE = 14;
            startf = frameCount;
            clear();
          }
        }
      },
    },
    {
      col: "lightblue",
      b: createButton("K-90g"),
      pos: [133, 300],
      size: 50,
      vis: false,
      modes: [13],
      fun: function () {
        if (buttons[32].vis) {
          buttons[32].b.style("background-color", "red");
          if (M11_sel == 0) {
            M11_sel += 1;
            M11_opt = [15];
          }
          if (M11_sel == 1 && !M11_opt.includes(15)) {
            M11_sel -= 1;
            M11_opt.push(15);
            MODE = 14;
            startf = frameCount;
            clear();
          }
        }
      },
    },
    {
      col: "skyblue",
      b: createButton("K-90h"),
      pos: [266, 300],
      size: 50,
      vis: false,
      modes: [13],
      fun: function () {
        if (buttons[33].vis) {
          buttons[33].b.style("background-color", "red");
          if (M11_sel == 0) {
            M11_sel += 1;
            M11_opt = [16];
          }
          if (M11_sel == 1 && !M11_opt.includes(16)) {
            M11_sel -= 1;
            M11_opt.push(16);
            MODE = 14;
            startf = frameCount;
            clear();
          }
        }
      },
    },
    {
      col: "blue",
      b: createButton("Inner Solar System"),
      pos: [100, 100],
      size: 50,
      vis: false,
      modes: [15],
      fun: function () {
        if (buttons[34].vis) {
          MODE = 100;
          M100_sys = 0;
        }
      },
    },
    {
      col: "green",
      b: createButton("Outer Solar System"),
      pos: [300, 100],
      size: 50,
      vis: false,
      modes: [15],
      fun: function () {
        if (buttons[35].vis) {
          MODE = 100;
          M100_sys = 1;
        }
      },
    },
    {
      col: "hotpink",
      b: createButton("Exoplanetary System"),
      pos: [200, 250],
      size: 50,
      vis: false,
      modes: [15],
      fun: function () {
        if (buttons[36].vis) {
          MODE = 100;
          M100_sys = 2;
        }
      },
    },
    {
      col: "lime",
      b: createButton("Mercury"),
      pos: [100, 100],
      size: 50,
      vis: false,
      modes: [16],
      fun: function () {
        if (buttons[37].vis) {
          MODE = 19;
          M15_ref = 0;
          clear();
        }
      },
    },
    {
      col: "cyan",
      b: createButton("Venus"),
      pos: [300, 100],
      size: 50,
      vis: false,
      modes: [16],
      fun: function () {
        if (buttons[38].vis) {
          MODE = 19;
          M15_ref = 1;
          clear();
        }
      },
    },
    {
      col: "orange",
      b: createButton("Earth"),
      pos: [100, 250],
      size: 50,
      vis: false,
      modes: [16],
      fun: function () {
        if (buttons[39].vis) {
          MODE = 19;
          M15_ref = 2;
          clear();
        }
      },
    },
    {
      col: "salmon",
      b: createButton("Mars"),
      pos: [300, 250],
      size: 50,
      vis: false,
      modes: [16],
      fun: function () {
        if (buttons[40].vis) {
          MODE = 19;
          M15_ref = 3;
          clear();
        }
      },
    },
    {
      col: "pink",
      b: createButton("Jupiter"),
      pos: [70, 150],
      size: 50,
      vis: false,
      modes: [17],
      fun: function () {
        if (buttons[41].vis) {
          MODE = 20;
          M15_ref = 0;
          clear();
        }
      },
    },
    {
      col: "orchid",
      b: createButton("Saturn"),
      pos: [200, 150],
      size: 50,
      vis: false,
      modes: [17],
      fun: function () {
        if (buttons[42].vis) {
          MODE = 20;
          M15_ref = 1;
          clear();
        }
      },
    },
    {
      col: "purple",
      b: createButton("Uranus"),
      pos: [330, 150],
      size: 50,
      vis: false,
      modes: [17],
      fun: function () {
        if (buttons[43].vis) {
          MODE = 20;
          M15_ref = 2;
          clear();
        }
      },
    },
    {
      col: "deeppink",
      b: createButton("Neptune"),
      pos: [133, 300],
      size: 50,
      vis: false,
      modes: [17],
      fun: function () {
        if (buttons[44].vis) {
          MODE = 20;
          M15_ref = 3;
          clear();
        }
      },
    },
    {
      col: "fuchsia",
      b: createButton("Pluto"),
      pos: [266, 300],
      size: 50,
      vis: false,
      modes: [17],
      fun: function () {
        if (buttons[45].vis) {
          MODE = 20;
          M15_ref = 4;
          clear();
        }
      },
    },
    {
      col: "lime",
      b: createButton("K-90b"),
      pos: [70, 100],
      size: 50,
      vis: false,
      modes: [18],
      fun: function () {
        if (buttons[46].vis) {
          MODE = 21;
          M15_ref = 0;
          clear();
        }
      },
    },
    {
      col: "forestgreen",
      b: createButton("K-90c"),
      pos: [200, 100],
      size: 50,
      vis: false,
      modes: [18],
      fun: function () {
        if (buttons[47].vis) {
          MODE = 21;
          M15_ref = 1;
          clear();
        }
      },
    },
    {
      col: "darkgreen",
      b: createButton("K-90i"),
      pos: [330, 100],
      size: 50,
      vis: false,
      modes: [18],
      fun: function () {
        if (buttons[48].vis) {
          MODE = 21;
          M15_ref = 2;
          clear();
        }
      },
    },
    {
      col: "lightgreen",
      b: createButton("K-90d"),
      pos: [70, 200],
      size: 50,
      vis: false,
      modes: [18],
      fun: function () {
        if (buttons[49].vis) {
          MODE = 21;
          M15_ref = 3;
          clear();
        }
      },
    },
    {
      col: "aquamarine",
      b: createButton("K-90e"),
      pos: [200, 200],
      size: 50,
      vis: false,
      modes: [18],
      fun: function () {
        if (buttons[50].vis) {
          M15_ref = 4;
          MODE = 21;
          clear();
        }
      },
    },
    {
      col: "turquoise",
      b: createButton("K-90f"),
      pos: [330, 200],
      size: 50,
      vis: false,
      modes: [18],
      fun: function () {
        if (buttons[51].vis) {
          M15_ref = 5;
          MODE = 21;
          clear();
        }
      },
    },
    {
      col: "lightblue",
      b: createButton("K-90g"),
      pos: [133, 300],
      size: 50,
      vis: false,
      modes: [18],
      fun: function () {
        if (buttons[52].vis) {
          MODE = 21;
          M15_ref = 6;
          clear();
        }
      },
    },
    {
      col: "skyblue",
      b: createButton("K-90h"),
      pos: [266, 300],
      size: 50,
      vis: false,
      modes: [18],
      fun: function () {
        if (buttons[53].vis) {
          MODE = 21;
          M15_ref = 7;
          clear();
        }
      },
    },
    {
      col: "blue",
      b: createButton("2D"),
      pos: [200, 150],
      size: 80,
      vis: false,
      modes: [100],
      fun: function () {
        if (buttons[54].vis) {
          if(M100_sys==0){
            MODE = 16;
            M100_dim = 2;
          }
          if(M100_sys==1){
            MODE = 17;
            M100_dim = 2;
          }
          if(M100_sys==2){
            MODE = 18;
            M100_dim = 2;
          }
        }
      },
    },
    {
      col: "hotpink",
      b: createButton("3D"),
      pos: [200, 300],
      size: 80,
      vis: false,
      modes: [100],
      fun: function () {
        if (buttons[55].vis) {
          if(M100_sys==0){
            MODE = 16;
            M100_dim = 3;
          }
          if(M100_sys==1){
            MODE = 17;
            M100_dim = 3;
          }
          if(M100_sys==2){
            MODE = 18;
            M100_dim = 3;
          }
        }
      },
    },
  ];

  for (let obj of buttons) {
    obj.b.position(obj.pos[0] - obj.size, obj.pos[1] - obj.size);
    obj.b.size(2 * obj.size);
    obj.b.mousePressed(obj.fun);
    if (obj.modes.length == 1) {
      obj.b.style("background-color", "#7e83e6");
    } else {
      obj.b.style("background-color", "#d3d3d3");
    }
    obj.b.style("border-style", "solid");
    obj.b.style("border-color", obj.col);
    obj.b.hide();
  }
}
function showKey(planets) {
  let i = -width / 2 + 35;

  for (let planet of planets) {
    fill(planet.col);
    text(planet.name, i, -height / 2 + 15);
    i += 50;
  }
}

function buttonVisible(buttons) {
  for (let obj of buttons) {
    if (obj.modes.includes(MODE)) {
      obj.b.show();
      obj.vis = true;
      if (obj.modes.length == 1) {
        obj.b.style("background-color", "#7e83e6");
      } else {
        obj.b.style("background-color", "#d3d3d3");
      }
      obj.b.style("border-style", "solid");
      obj.b.style("border-color", obj.col);
    } else {
      obj.b.hide();
      obj.vis = false;
      if (obj.modes.length == 1) {
        obj.b.style("background-color", "#7e83e6");
      } else {
        obj.b.style("background-color", "#d3d3d3");
      }
      obj.b.style("border-style", "solid");
      obj.b.style("border-color", obj.col);
    }
  }
}
let nn = 0;
function draw() {
  
  setCamera(defaultCamera);
  if (MODE == 0) {
    clear();
    textAlign(CENTER);
    fill("white");
    tint(255,128)
    imageMode(CENTER);
    image(apod,0,0,400,400)
    textSize(18);
    if (nn == 0) {
      nn = 10;
    } else if (nn <= 10 && 1 < nn) {
      nn -= 1;
    } else {
      setCamera(defaultCamera);
      text(" Explore different graphs and views of planetary orbits!", 0, -170);
      
    }
  }

  if (MODE != 0) {
    nn = 0;
  }

  if (MODE == 1) {
    clear();
    tint(255,128)
    imageMode(CENTER);
    image(apod,0,0,400,400)
  }
  if (MODE == 2) {
    clear();
    imageMode(CENTER);
    image(keplerSolar, 0, -35, 325, 325);
  }
  if (MODE == 3) {
    clear();
    imageMode(CENTER);
    image(keplerExo, 0, -35, 325, 325);
  }
  if (MODE == 4) {
    clear();
    tint(255,128)
    imageMode(CENTER);
    image(apod,0,0,400,400)
  }
  if (MODE == 5) {
    if (M4_dim == 2) {
      innerPlanets2d();
    }
    if (M4_dim == 3) {
      setCamera(freeCam);
      innerPlanets3d();
    }
    showKey(innerPlanets);
  }
  if (MODE == 6) {
    if (M4_dim == 2) {
      outerPlanets2d();
    }
    if (M4_dim == 3) {
      setCamera(freeCam);
      outerPlanets3d();
    }
    showKey(outerPlanets);
  }
  if (MODE == 7) {
    if (M4_dim == 2) {
      exoPlanets2d();
    }
    if (M4_dim == 3) {
      setCamera(freeCam);
      exoPlanets3d();
    }
    showKey(exoPlanets);
  }
  if (MODE == 8) {
    clear();
    tint(255,128)
    imageMode(CENTER);
    image(apod,0,0,400,400)
  }
  if (MODE == 9) {
    clear();
    imageMode(CENTER);
    image(anglePluto, 0, -35, 325, 325);
  }
  if (MODE == 10) {
    clear();
    imageMode(CENTER);
    image(angleExo, 0, -35, 325, 325);
  }
  if (MODE == 11) {
    clear();
    tint(255,128)
    imageMode(CENTER);
    image(apod,0,0,400,400)
  }
  if (MODE == 12) {
    clear();
    tint(255,128)
    imageMode(CENTER);
    image(apod,0,0,400,400)
    if (M11_sel == 0) {
      textAlign(CENTER);
      fill("black");
      textSize(18);
      setCamera(defaultCamera);
      text(" Choose the first planet", 0, 180);
    }
    if (M11_sel == 1) {
      textAlign(CENTER);
      fill("black");
      textSize(18);
      setCamera(defaultCamera);
      text(" Choose the second planet", 0, 180);
    }
  }
  if (MODE == 13) {
    clear();
    tint(255,128)
    imageMode(CENTER);
    image(apod,0,0,400,400)
    if (M11_sel == 0) {
      textAlign(CENTER);
      fill("black");
      textSize(18);
      setCamera(defaultCamera);
      text(" Choose the first planet", 0, 180);
    }
    if (M11_sel == 1) {
      textAlign(CENTER);
      fill("black");
      textSize(18);
      setCamera(defaultCamera);
      text(" Choose the second planet", 0, 180);
    }
  }
  if (MODE == 14) {
    p1 = min(M11_opt[0], M11_opt[1]);
    p2 = max(M11_opt[0], M11_opt[1]);

    spirograph(allPlanets[p1], allPlanets[p2], startf);
  }
  if (MODE == 15) {
    clear();
    tint(255,128)
    imageMode(CENTER);
    image(apod,0,0,400,400)
  }
  if (MODE == 16) {
    clear();
    tint(255,128)
    imageMode(CENTER);
    image(apod,0,0,400,400)
    textAlign(CENTER);
    fill("black");
    textSize(18);
    setCamera(defaultCamera);
    text(" Choose the 'center of the universe'", 0, 120);
  }
  if (MODE == 17) {
    clear();
    tint(255,128)
    imageMode(CENTER);
    image(apod,0,0,400,400)
    textAlign(CENTER);
    fill("black");
    textSize(18);
    setCamera(defaultCamera);
    text(" Choose the 'center of the universe'", 0, -170);
  }
  if (MODE == 18) {
    clear();
    tint(255,128)
    imageMode(CENTER);
    image(apod,0,0,400,400)
    textAlign(CENTER);
    fill("black");
    textSize(18);
    setCamera(defaultCamera);
    text(" Choose the 'center of the universe'", 0, -170);
  }
  if (MODE == 19) {
    if(M100_dim==2){
      setCamera(defaultCamera);
      ptolemaic2(innerPlanets[M15_ref], innerPlanets, 80);
    }
    if(M100_dim==3){
    setCamera(icam);
      ptolemaic3(innerPlanets[M15_ref], innerPlanets, 80);
    }
    
    showKey(innerPlanets);
  }
  if (MODE == 20) {
    if(M100_dim==2){
      setCamera(defaultCamera);
      ptolemaic2(outerPlanets[M15_ref], outerPlanets, 4);
    }
    if(M100_dim==3){
      setCamera(ocam);
      ptolemaic3(outerPlanets[M15_ref], outerPlanets, 4);
    }
    
    showKey(outerPlanets);
  }
  if (MODE == 21) {
    if(M100_dim==2){
      setCamera(defaultCamera);
      ptolemaic2(exoPlanets[M15_ref], exoPlanets, 100);
    }
    if(M100_dim==3){
      setCamera(ecam);
      ptolemaic3(exoPlanets[M15_ref], exoPlanets, 150);
    }
    
    showKey(exoPlanets);
  }
  if (MODE==100){
    clear();
    tint(255,128)
    imageMode(CENTER);
    image(apod,0,0,400,400)
  }

  buttonVisible(buttons);
}
function exoPlanets2d() {
  planets2d(exoPlanets, 200, 0.5, 0);
}
function exoPlanets3d() {
  planets3d(exoPlanets, 200, 0.5, 0);
}
function innerPlanets2d() {
  planets2d(innerPlanets, 100, 1, 0);
}
function innerPlanets3d() {
  planets3d(innerPlanets, 100, 1, 0);
}
function outerPlanets2d() {
  planets2d(outerPlanets, 4, 20, 0);
}
function outerPlanets3d() {
  planets3d(outerPlanets, 4, 20, 0);
}
function planets2d(members, AU, scaleInAU, timeRep) {
  let fr = 20;
  frameRate(fr);
  
  let yearT = 2 / members[timeRep].T;
  clear();
  background(400);
  let f = frameCount / fr;

  for (let planet of members) {
    a = planet.a * AU;
    e = planet.e;
    theta = (f * 2 * PI) / (planet.T * yearT);
    animateOrbit2d(a, e, theta, planet.col);
  }
  drawScale2d(scaleInAU * AU);
}
function planets3d(members, AU, scaleInAU, timeRep) {
  orbitControl();
  let fr = 20;
  frameRate(fr);
  let yearT = 2 / members[timeRep].T;
  clear();
  background(400);
  let f = frameCount / fr;

  for (let planet of members) {
    a = planet.a * AU;
    e = planet.e;
    beta = (planet.beta * 2 * PI) / 360;
    theta = (f * 2 * PI) / (planet.T * yearT);
    animateOrbit3d(a, e, theta, beta, planet.col);
  }
  drawScale3d(scaleInAU * AU);
}
function animateOrbit2d(a, e, theta, col) {
  let r = (a * (1 - e ** 2)) / (1 - e * cos(theta));
  dEllipse2d(a, e, col);
  stroke(col);
  circle(r * cos(theta), -r * sin(theta), 2);
  stroke(0);
}
function animateOrbit3d(a, e, theta, beta, col) {
  let r = (a * (1 - e ** 2)) / (1 - e * cos(theta));
  dEllipse3d(a, e, beta, col);
  push();
  stroke(col);
  translate(
    r * cos(theta) * cos(beta),
    -r * sin(theta),
    r * cos(theta) * sin(beta)
  );
  sphere(2);
  pop();
  stroke(0);
}
function pos3d(planet, f, AU, yt) {
  let a = planet.a * AU;
  let e = planet.e;
  let theta = (f * 2 * PI) / (planet.T * yt) + planet.start;
  let beta = planet.beta;
  let r = (a * (1 - e ** 2)) / (1 - e * cos(theta));
  return createVector(
    r * cos(theta) * cos(beta),
    -r * sin(theta),
    r * cos(theta) * sin(beta)
  );
}
function drawScale2d(sc) {
  stroke(200);
  strokeWeight(1);
  let i = 0;
  line(-width / 2, 0, width / 2, 0);
  while (i <= height / 2) {
    i += sc;
    line(-width / 2, i, width / 2, i);
    line(-width / 2, -i, width / 2, -i);
  }
  i = 0;
  line(0, -height / 2, 0, height / 2);
  while (i <= width / 2) {
    i += sc;
    line(i, -height / 2, i, height / 2);
    line(-i, -height / 2, -i, height / 2);
  }
  stroke(0);
  strokeWeight(2);
}
function drawScale3d(sc) {
  stroke(200);
  strokeWeight(1);

  let i = 0;
  let j = 0;
  let z = -sc;

  while (z <= sc) {
    i = 0;
    if (z == -sc) {
      stroke("plum");
    } else if (z == 0) {
      stroke("lavender");
    } else {
      stroke("lightpink");
    }
    line(-width, 0, z, width, 0, z);
    while (i <= height / 2) {
      i += sc;
      line(-width, i, z, width, i, z);
      line(-width, -i, z, width, -i, z);
    }
    i = 0;
    if (z == -sc) {
      stroke("skyblue");
    } else if (z == 0) {
      stroke("paleturquoise");
    } else {
      stroke("powderblue");
    }
    line(0, -height, z, 0, height, z);
    while (i <= height / 2) {
      i += sc;
      line(i, -height, z, i, height, z);
      line(-i, -height, z, -i, height, z);
    }
    z += sc;
  }
  i = 0;
  stroke("lightsalmon");
  while (i <= width / 2) {
    j = 0;
    while (j <= height / 2) {
      line(i, j, sc, i, j, -sc);
      line(-i, j, sc, -i, j, -sc);
      line(i, -j, sc, i, -j, -sc);
      line(-i, -j, sc, -i, -j, -sc);
      j += sc;
    }
    i += sc;
  }
  stroke(0);
  strokeWeight(2);
}
function dEllipse2d(a, e, col) {
  let b = sqrt(a * a * (1 - e ** 2));
  let r_0 = (a * (1 - e ** 2)) / (1 - e * cos(0));
  let r_Pi_2 = (-1 * a * (1 - e ** 2)) / (1 - e * cos(PI / 2));
  let r_Pi = (-1 * a * (1 - e ** 2)) / (1 - e * cos(PI));
  let r_3Pi_2 = (a * (1 - e ** 2)) / (1 - e * cos((3 * PI) / 2));

  let centerX = (r_0 + r_Pi) / 2;
  let centerY = (r_Pi_2 + r_3Pi_2) / 2;
  ellipseMode(RADIUS);
  noFill();
  stroke(col);
  ellipse(centerX, centerY, a, b, 50);
  stroke(0);
  fill(400, 400, 400);
}
function dEllipse3d(a, e, beta, col) {
  let b = sqrt(a * a * (1 - e ** 2));
  let r_0 = (a * (1 - e ** 2)) / (1 - e * cos(0));
  let r_Pi_2 = (-1 * a * (1 - e ** 2)) / (1 - e * cos(PI / 2));
  let r_Pi = (-1 * a * (1 - e ** 2)) / (1 - e * cos(PI));
  let r_3Pi_2 = (a * (1 - e ** 2)) / (1 - e * cos((3 * PI) / 2));

  let centerX = (r_0 + r_Pi) / 2;
  let centerY = (r_Pi_2 + r_3Pi_2) / 2;
  ellipseMode(RADIUS);
  noFill();
  stroke(col);
  push();
  rotateY(-beta);
  ellipse(centerX, centerY, a, b, 50);
  pop();
  stroke(0);
  fill(400, 400, 400);
}
function spirograph(p1, p2, startf) {
  let fr = 500;
  frameRate(fr);
  let planets = [p2, p1];
  let done = false;
  let AU = width / (3 * p2.a);

  //background(400);
  let f = ((frameCount - startf) * (p2.T + 0.1)) / 100;
  let ls = [];
  let r;
  for (let planet of planets) {
    a = planet.a * AU;
    e = planet.e;
    theta = (f * 2 * PI) / planet.T;
    if (planet == p2 && theta > 12 * PI) {
      done = true;
    }
    if (!done) {
      animateOrbit2d(a, e, theta, planet.col);
      r = (a * (1 - e ** 2)) / (1 - e * cos(theta));
      ls.push(r * cos(theta));
      ls.push(-r * sin(theta));
    }
  }
  if (!done) {
    line(ls[0], ls[1], ls[2], ls[3]);
  }
}
function ptolemaic2(orig, planets, AU) {
  let fr = 100;
  frameRate(fr);
  let yearT = 2 / orig.T;
  //background(400);

  let f = (15 * frameCount) / fr;
  let oldf = (15 * (frameCount - 1)) / fr;
  for (let planet of planets) {
    old = positionPtolemaic(AU, planet, orig, oldf, yearT);
    pos = positionPtolemaic(AU, planet, orig, f, yearT);
    stroke(planet.col);

    line(old[0], old[1], old[2], pos[0], pos[1], pos[2]);
    stroke(0);
  }
  //drawScale3d(100);
  drawScale2d(100);
}
function ptolemaic3(orig, planets, AU) {
  let fr = 1000;
  frameRate(fr);
  let yearT = 2 / orig.T;


  let f = (10 * frameCount) / fr;
  let oldf = (10 * (frameCount - 1)) / fr;
  for (let planet of planets) {
    old = positionPtolemaic(AU, planet, orig, oldf, yearT);
    pos = positionPtolemaic(AU, planet, orig, f, yearT);
    stroke(planet.col);

    line(old[0], old[1], old[2], pos[0], pos[1], pos[2]);
    stroke(0);
  }
  drawScale3d(100);
}
function positionPtolemaic(AU, planet, refnet, f, yt) {
  let v1 = pos3d(planet, f, AU, yt);
  let v2 = pos3d(refnet, f, AU, yt);
  v1.sub(v2);
  return [v1.x, v1.y, v1.z];
}
