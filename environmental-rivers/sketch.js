/*
This template visualises UK flood data by cycling through 1 river at a time
*/

let myData;
let index;
let river;
let beginPoint;
let endPoint;
let riverWidth;
const BLANKMESSAGE = "No flood information given."
const HEADERTEXT = "UK Rivers Flood Status";
const BOTTOMMARGIN = 52;

function preload() {
  // API definition - https://environment.data.gov.uk/flood-monitoring/doc/reference
  // local saved version of data best for frequent testing
  myData = loadJSON('data/floods.json')
  // live data best for final version
  // myData = loadJSON('https://environment.data.gov.uk/flood-monitoring/id/floods')
  // myData will represent an array of river objects containing data for each river
}
function setup() {
  createCanvas(innerWidth, innerHeight);
  noLoop();
  selectNewRiver();
} 
function selectNewRiver(){
  // reset background (deletes all previous drawing)
  background(0)
  fill(255)
  textSize(36);
  textAlign(CENTER, CENTER);
  text(HEADERTEXT, width/2, height - BOTTOMMARGIN/2);
  textAlign(LEFT, TOP);
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
  setTimeout(selectNewRiver,5000);
}
function drawRiver(){
  noFill()
  // randomly derive a blueish colour
  stroke(random(100), random(100), 255, 200)
  // set the stroke weight so that it relates somewhat to the flood level of the river
  strokeWeight(random(50*riverWidth, 100*riverWidth))
  // drawing routine
  beginShape()
  vertex(beginPoint.x, beginPoint.y)
  let segments = 5;
  let x, y;
  // make a slightly wiggly line between the start and end point of the river
  for (let i = 1; i < segments; i++) {
    x = width / segments * i;
    y = height/2 + random(riverWidth * -50, riverWidth * 50)
    vertex(x,y)
    // uncomment circle to see exactly where each vertex is placed
    // circle(x, y, 100)
  }
  vertex(endPoint.x, endPoint.y)
  endShape()
}
function newRiver(river) {
  // evaluate riverWidth based on severity of flooding, transforming it into a number between 1 (least severe) and 4 (most severe)
  riverWidth = 5 - river.severityLevel // original data given: 1 = worst, 4 = best
  // calculate beginning and end points fixed to left and right edges of the canvas
  beginPoint = { x: 0, y: random(height * 0.25, height * 0.75) }
  endPoint = { x: width, y: random(height * 0.25, height * 0.75) }
}
function drawOverlay(){
  fill(255)
  noStroke()
  textSize(24);
  // draw river name
  text(river.description, 50, 50);
  textSize(18);
  // draw flood message or if empty use blank message rather than show an empty string
  let message = river.message.trim() || BLANKMESSAGE; // trim() removes leading white space
  text(message, 50, 100, width/2);
}
