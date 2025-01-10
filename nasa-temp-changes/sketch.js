/*
This template visualises average temperature changes since 1880
https://data.giss.nasa.gov/gistemp/
*/
const HEADERTEXT = "Annual Global Temperature Fluctuation 1980 - 2019";
const TOPMARGIN = 52;
let averageTemps = [];
// let currentMonth;
let minTemp, maxTemp;
let hotColour, coldColour;
let vhc = 0;
let exactYear = 0;
// how much to rotate the circle by each frame
let rot = 0;
let trot = 0;
let theta = [];
let thetaT = [];
let radius = [];
let delta = [];
let textRadius = [];
let stopDraw = 0;
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

//label for circles
let tempDegree = ["0°"];

//time period labels to be displayed
let timePeriods = ["1980 - 1989", "1990 - 1999", "2000 - 2009", "2010 - 2019"];

//time labels for 1980s
let yearEighties = [
  "1980",
  "1981",
  "1982",
  "1983",
  "1984",
  "1985",
  "1986",
  "1987",
  "1988",
  "1989",
];

//time labels for 1990s
let yearNineties = [
  "1990",
  "1991",
  "1992",
  "1993",
  "1994",
  "1995",
  "1996",
  "1997",
  "1998",
  "1999",
];

//time labels for 2000s
let yearNoughties = [
  "2000",
  "2001",
  "2002",
  "2003",
  "2004",
  "2005",
  "2006",
  "2007",
  "2008",
  "2009",
];

//time labels for 2010s
let yearTens = [
  "2010",
  "2011",
  "2012",
  "2013",
  "2014",
  "2015",
  "2016",
  "2017",
  "2018",
  "2019",
];

let decadeSelection = yearEighties;

// change opacity
let a = 255;
//change size
let circleSize = 10;
// gaussian
let gaussianRandom = 0;
// rotInc = Speed
let circleSpeed = 0.0025;
// year change
let decadeButton = 0;
let yearDial = 0;
// distance of where the circles place is expanded
let circleDistance = 0.25;

function preload() {
  table = loadTable("data/data.csv", "csv", "header");
}

function setup() {
  createCanvas(innerWidth, innerHeight);
  for (let rowI = 0; rowI < 40; rowI++) {
    for (let colI = 0; colI < 12; colI++) {
      averageTemps.push(table.get(rowI, colI));
    }
  }
  // print(averageTemps)
  minTemp = min(averageTemps);
  // find the highest value
  maxTemp = max(averageTemps);
  // define 2 colours that will form either end of a range of possible colurs
  hotColour = color(255, 0, 0, a);
  coldColour = color(0, 0, 255, a);
  // use squared ends when draing strokes
  strokeCap(SQUARE);
  // centre text
  textAlign(CENTER, CENTER);
  // start Midi
  setupController();
  calculate();
  // selectDraw();

  draw();
}

//Calculate function
function calculate() {
  let decade = decadeButton;
  r = height * circleDistance;
  textR = height * 0.25;
  radius = [];
  textRadius = [];
  theta = [];
  delta = [];
  for (let i = 0 + 120 * decade; i < 120 + 120 * decade; i++) {
    radius.push(averageTemps[i] * r);
    textRadius.push(textR + r * 0.6);
    theta.push(((2 * Math.PI) / 12) * i + 0.25 * (Math.random() - 0.5));
    thetaT.push(((2 * Math.PI) / 12) * i);
    delta.push(map(averageTemps[i], minTemp, maxTemp, 0, 1));
  }
}

function draw() {
  background(0, 15);

  textSize(36);
  fill(255);
  noStroke();
  text(HEADERTEXT, width / 2, TOPMARGIN / 2);
  fill(0);

  //time periods text
  fill(255);
  text(timePeriods[0], 140, 150);
  text(timePeriods[1], 140, 190);
  text(timePeriods[2], 140, 230);
  text(timePeriods[3], 140, 270);
  stroke(255);
  strokeWeight(3);
  line(40, 167 + 40 * decadeButton, 245, 167 + 40 * decadeButton);

  //exact year text
  fill(255);
  stroke(255);
  textSize(50);
  strokeWeight(1);
  text(decadeSelection[exactYear], 1200, 800);

  translate(width / 2, height / 2);

  // outer ring
  fill(0, 0, 0, 0);
  stroke(255);
  strokeWeight(1);
  circle(0, 0, r * 2.8);

  // middle ring
  fill(0, 0, 0, 0);
  stroke(255);
  strokeWeight(1);
  circle(0, 0, r);

  noStroke();
  // coords of each point
  let x, y;
  // how much to advance rotation of the circle by each frame
  let rotInc = circleSpeed;

  //stroke for circles
  strokeWeight(1);

  for (let i = 0; i < 120; i++) {
    fill(lerpColor(coldColour, hotColour, delta[i], a));
    stroke(lerpColor(coldColour, hotColour, delta[i], a));
    push();
    x = cos(theta[i] + rot) * radius[i] + randomGaussian(1, gaussianRandom);
    y = sin(theta[i] + rot) * radius[i] + randomGaussian(1, gaussianRandom);
    tx = cos(thetaT[i] + rot) * textRadius[i];
    ty = sin(thetaT[i] + rot) * textRadius[i];

    //Draws points
    circle(x, y, circleSize);
    ellipse(x, y);
    stroke(0);
    strokeWeight(1);
    fill(225);

    //draws months and zero marker
    text(months[i], tx, ty);
    textSize(20);
    text(tempDegree[i], tx / 2.8, ty / 2.8);

    //
    pop();
  }

  //
  for (let i = 0; i < 1; i++) {
    push();
    tx = cos(thetaT[i] + rot) * textRadius[i];
    ty = sin(thetaT[i] + rot) * textRadius[i];

    stroke(0);
    strokeWeight(1);
    fill(225);
    textSize(20);
    text(tempDegree[i], tx / 2.8, ty / 2.8);

    pop();
  }

  //
  for (let i = 0 + 12 * yearDial; i < 12 + 12 * yearDial; i++) {
    fill(0, 0, 0, 0);
    stroke(255, 255, 255, 200);
    x = cos(theta[i] + rot) * radius[i] + randomGaussian(1, gaussianRandom);
    y = sin(theta[i] + rot) * radius[i] + randomGaussian(1, gaussianRandom);

    //Draw circle
    circle(x, y, circleSize);
    stroke(0);
    strokeWeight(1);
    fill(225);
  }

  // once the circle has been rendered, increment the rotation value
  // no need to return rot to zero once TAU has been reached
  // as the effective value will be the remainder when divided by TAU
  rot += rotInc;
}

/**
 * React to inputs from the control change sliders in the Midi controller
 * @param {Event} e
 */
function allCC(e) {
  console.log("controller:", e.controller.number, "value:", e.value);
  switch (e.controller.number) {
    case 32: {
      yearDial = Math.trunc(e.value * 9);
      exactYear = Math.trunc(e.value * 9);
      break;
    }
    case 33: {
      break;
    }
    case 34: {
      break;
    }
    case 35: {
      break;
    }
    case 36: {
      //slider 1
      // Change the alpha
      a = 255 * e.value + 20; // + 50 so that opacity never goes to 0
      // define 2 colours that will form either end of a range of possible colurs
      hotColour = color(255, 0, 0, a);
      coldColour = color(0, 0, 255, a);
      break;
    }
    case 37: {
      //slider 2
      //changes radius postion of circle
      circleDistance = 1 * e.value + 0.25;
      calculate();
      break;
    }
    case 38: {
      //slider 3
      //Changes the distribution of circles
      gaussianRandom = 50 * e.value;
      break;
    }
    case 39: {
      //slider 4
      //changes the speed of circles
      // circleSpeed = 0.025 * e.value + 0.0025;
      circleSpeed = map(e.value, 0, 1, -0.0275, 0.0275);
      break;
    }
  }
}

/**
 * All buttons change between four different time perio
 * React to inputs from the bottom buttons on the controller
 * @param {Event} e
 */
function allNoteOn(e) {
  console.log("controller:", e.data[1], "value:", e.value);
  switch (e.data[1]) {
    case 40: {
      if (e.value) {
        //button 1
        decadeButton = 0;
        decadeSelection = yearEighties;
        calculate();
      } else {
      }
      break;
    }
    case 41: {
      if (e.value) {
        //button 2
        decadeButton = 1;
        decadeSelection = yearNineties;
        calculate();
      } else {
      }
      break;
    }
    case 42: {
      if (e.value) {
        //button 3
        decadeButton = 2;
        decadeSelection = yearNoughties;
        calculate();
      } else {
      }
      break;
    }
    case 43: {
      if (e.value) {
        //button 4
        decadeButton = 3;
        decadeSelection = yearTens;
        calculate();
      } else {
      }
      break;
    }
  }
}
