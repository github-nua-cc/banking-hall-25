/*
This template visualises UK flood data by cycling through 1 river at a time
*/

// colours variables used for MIDI control sliders
let alpha = 255; // skintone transparency
let r = 64; // individual rgb variables
let g = 0;
let b = 0;


let myData;
let index;
let river;
let beginPoint;
let endPoint;
let riverWidth;
let branchLength1 = 250;
let branchLength2 = 150;
let floodWarning;
let isTidal; // boolean
let floodDescription; // flood description - optional
let showMessage = false;

let numberOfPoints = 5;

const BLANKMESSAGE = "No flood information given."
const HEADERTEXT = "UK Rivers Flood Status";
const BOTTOMMARGIN = 52;
const TOPMARGIN = 52;
const cellSize = 3;
let riverInterval;

function preload() {
  // API definition - https://environment.data.gov.uk/flood-monitoring/doc/reference
  // local saved version of data best for frequent testing
  myData = loadJSON('data/floods.json')
  // live data best for final version
  // myData = loadJSON('https://environment.data.gov.uk/flood-monitoring/id/floods')
  // myData will represent an array of river objects containing data for each river
}
function setup() {


  //canvas position - Oli
  let canvas = createCanvas(innerWidth * CANVAS_RATIO, innerHeight * CANVAS_RATIO);
  canvas.id("canvas"); 
  let newCanvasX = (windowWidth) - width;
  let newCanvasY = (windowHeight) / 8;
  // canvas.position(newCanvasX, newCanvasY);

  //noLoop();
  selectNewRiver();
  setupController();
  riverInterval = setInterval(selectNewRiver, 5000);

  frameRate(15)
  tempFrames = frameRate(15)

  noiseSeed(1);


  // river colours
  r = random(255);
  g = random(100);
  b = random(100);
}
function selectNewRiver() {
  // reset background (deletes all previous drawing)
  // background(0)
  fill(255)
  // textSize(26);
  // textAlign(CENTER, CENTER);
  // text(HEADERTEXT, width/2, height - BOTTOMMARGIN/2);
  // textAlign(LEFT, TOP);
  // choose a new river index at random
  index = floor(random(myData.items.length - 1))
  // assign the current river data object for ease of reference
  river = myData.items[index];
  // use print(river) to see all the info contained in a river object
  // print(river)
  // calculate drawing info for river
  newRiver(river)
  // drawy the river
  drawRiver();

  // draw the info text
  drawOverlay();
  // move to the next river after a given number of milliseconds
}

// Draws a background grid, colouring it with different colours for different values of N
function drawBackground() {
  noStroke();
  //background(220);
  for (y = 0; y < height; y += cellSize) {
    for (x = 0; x < width; x += cellSize) {
      let n = noise(x * 0.005, y * 0.005);

      if (n < 0.25) {
        fill(216, 150, 91, alpha);
      }
      else if (n < 0.5) {
        fill(200, 125, 80, alpha);
      }
      else if (n < 0.75) {
        fill(185, 115, 70, alpha);
      }
      else {
        fill(189, 105, 64, alpha);
      }
      rect(x, y, cellSize);
    }
  }
  // makes it not pixelated
  filter(BLUR, 10);
}

function draw() {
  background(0, 20);
  drawBackground();

  drawRiver();
  drawOverlay();


  // selectNewRiver();
}

function drawRiver() {
  noFill()
  stroke(r, g, b)

  // set the stroke weight so that it relates severity level of the flood
  if (riverWidth == 2) {
    strokeWeight(5)
  } else if (riverWidth == 3) {
    strokeWeight(15)
  } else {
    strokeWeight(25)
  }


  // drawing routine
  beginShape()

  // curveVertex(beginPoint.x, beginPoint.y)
  vertex(beginPoint.x, beginPoint.y)


  let segments = 8;
  let points = [];
  for (let i = 0; i < numberOfPoints; i++) {
    points.push(parseInt(random(1, 7)));
  }

  let x, y;

  curveVertex(0, height / 2 );

  let yVector = [];

  // make a slightly wiggly line between the start and end point of the river
  for (let i = 1; i < segments; i++) {
    x = width / segments * i;
    y = height / 2 + random(riverWidth * -50, riverWidth * 50)
    yVector.push(y);
    curveVertex(x, y)
    // vertex(x,y)
    // bezierVertex(x - 5, y - 5, x + 5, y + 5, x, y)

    for (let j = 0; j < numberOfPoints; j++) {
      if (i == points[j]) {
        let beginning = random(0, 1) < 0.5;
        let ending = random(0, 1) < 0.5;

        if (beginning) {
          // second branches
          let x2 = random(x, x + branchLength1)
          let y2 = random(y - branchLength1, y + branchLength1)

          let x3 = (x2 + branchLength2)
          let y3 = y2 + 50

          // line(x, y, x2, y2);
          // bezier(x, y, x + 20, y + 20, x2 - 20, y2 - 20, x2, y2)

          // // third branches
          if (ending) {
            // line(x2,y2,x3, y3)
          //   bezier(x2, y2, x2 - 20, y2 + 20, x3 - 20, y3 - 20, x3, y3)

          } else {
            // line(x2, y2, x3,y3)
          //   bezier(x2, y2, x2 + 20, y2 + 20, x3 - 20, y3 - 20, x3, y3)

            // line(x2, y2, x3, (y2 - 50))
          //   bezier(x2, y2, x2 - 20, y2 - 20, x3 + 20, (y2 - 50) + 20, x3, (y2 - 50))
          // }
          // circles appear on river (clots) if river is tital (even if only one of them is)
          if (isTidal == true && (i == point1 || i == point3)) {
            fill(r, g, b)
            circle(x, y, 30)
            noFill()
          }

          }
        }
      }
    }
  }


  curveVertex(endPoint.x, endPoint.y)
  curveVertex(endPoint.x, endPoint.y)
  // vertex(endPoint.x, endPoint.y)


  endShape()

  for (let i = 1; i < segments; i++) {
    x = width / segments * i;
    y = yVector[i - 1];
    // vertex(x,y)
    // bezierVertex(x - 5, y - 5, x + 5, y + 5, x, y)

    for (let j = 0; j < numberOfPoints; j++) {
      if (i == points[j]) {
        let beginning = random(0, 1) < 0.5;
        let ending = random(0, 1) < 0.5;

        // coordinate change varibale

        if (beginning) {
          // second branches
          let x2 = random(x, x + branchLength1)
          let y2 = random(y - branchLength1, y + branchLength1)

          let x3 = (x2 + branchLength2)
          let y3 = y2 + 50

          // line(x, y, x2, y2);
          bezier(x, y, x + 20, y + 20, x2 - 20, y2 - 20, x2, y2)
          // curve(x + 20, y + 20, x, y, x2, y2, x2 + 20, y2 + 20);

          // // third branches
          if (ending) {
            // line(x2,y2,x3, y3)
            bezier(x2, y2, x2 - 20, y2 + 20, x3 - 20, y3 - 20, x3, y3)

          } else {
            // line(x2, y2, x3,y3)
            bezier(x2, y2, x2 + 20, y2 + 20, x3 - 20, y3 - 20, x3, y3)

            // line(x2, y2, x3, (y2 - 50))
            bezier(x2, y2, x2 - 20, y2 - 20, x3 + 20, (y2 - 50) + 20, x3, (y2 - 50))
          // }
          // circles appear on river (clots) if river is tital (even if only one of them is)

          }
        }
      }
    }
  }
  // noLoop();
}
function newRiver(river) {
  // evaluate riverWidth based on severity of flooding, transforming it into a number between 1 (least severe) and 4 (most severe)
  riverWidth = 5 - river.severityLevel // original data given: 1 = worst, 4 = best
  floodWarning = river.severity
  isTidal = river.isTidal
  // calculate beginning and end points fixed to left and right edges of the canvas
  beginPoint = { x: 0, y: random(height * 0.25, height * 0.75) }
  endPoint = { x: width, y: random(height * 0.25, height * 0.75) }
}
function drawOverlay() {
  fill(255)
  noStroke()
  textSize(20);
  // draw river name
  let riverDescription = river.description
  let riverText = text(riverDescription, 50, 50);
  if (showMessage == true) {
    text(river.message, 50, 100, 1000);
  }
  // textSize(18);

  textSize(36);
  textAlign(CENTER, CENTER);
  text(HEADERTEXT, width / 2, TOPMARGIN / 2);
  textAlign(LEFT, TOP);
  
  redraw();
}


/**
 * React to inputs from the control change sliders in the Midi controller
 * @param {Event} e 
 */
/* reacts to sliders and dials */

// note - dials change background, sliders change river features, 1st button stops the loop when held
function allCC(e) {
  console.log('controller:', e.controller.number, 'value:', e.value);
  switch (e.controller.number) {
    case 32: { /* first dial */
      alpha = e.value * 255; //background transparency
      break;
    }
    case 33: {
      noiseSeed(e.value * 10); //change background seed
      break;
    }
    case 34: {
      frameRate(e.value * 10 + 1);

      break;
    }
    case 35: { /* last dial */
      break;
    }
    case 36: { /* first slider */

      // changes colour of river (?)
      r = map(e.value, 0, 1, 255, 150);
      //g = e.value *100;
      b = map(e.value, 0, 1, 150, 255)


      break;
    }
    case 37: {
      // second slider - branch length
      branchLength1 = map(e.value, 0, 1, 100, 250);
      branchLength2 = map(e.value, 0, 1, 70, 150);


      break;
    }
    case 38: {
      // changing number of points on a branch depending on slider
      numberOfPoints = map(e.value, 0, 1, 1, 7);
      break;
    }
    case 39: { /* last slider */
      break;
    }
  }
}
/**
 * React to inputs from the bottom buttons on the controller
 * @param {Event} e 
 */
function allNoteOn(e) {
  console.log('controller:', e.data[1], 'value:', e.value);
  switch (e.data[1]) {
    case 40: {
      if (e.value) { // stops the loop
            noLoop()
            clearInterval(riverInterval);
      } else {
        riverInterval = setInterval(selectNewRiver, 5000);
        loop()
      }
      break;
    }
    case 41: {
      if (e.value) { // shows river info text
        // if button held, show info, middle of the screen(?) diana's idea lol
        showMessage = true;
      } else {
        // dont show any river info
        showMessage = false;
      }
      break;
    }
    case 42: {
      if (e.value) {
      } else {
      }
      break;
    }
    case 43: {
      if (e.value) {
      } else {
      }
      break;
    }
  }
}