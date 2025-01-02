/*
This template visualises UK solar panel installations by Megawatt over the last decade
data is taken from https://www.data.gov.uk/dataset/c647e722-b691-47e9-a765-a22e24f05a04/solar-photovoltaics-deployment
*/
// reference to loaded data
let table;
// array to hold names of year / month 
let monthlyNames;
// array to hold MW value of solar panel installations corresponding to monthlyNames
let monthlyValues = [];
// minimum MW value
let minValue;
// maximum MW value
let maxValue;
// 'hot' colour
let maxColour;
// 'cold' colour
let minColour;
const HEADERTEXT = "UK Solar Power Installations by Megawatt";
const TOPMARGIN = 52;
function preload() {
  table = loadTable("data/installs.csv", "csv", "header");
}
function setup() {
  createCanvas(innerWidth, innerHeight);
  // get names of months
  monthlyNames = table.columns;
  // get rid of first value (unused)
  monthlyNames.shift();
  // print(monthlyNames)
  // get number of cols in table
  let colCount = table.getColumnCount();
  // get total monthly value of UK solar installs by MegaWatts
  // ignoring first col, store each col value in row 7 (UK total MW per month) to array
  // use replace to get rid of separating comma used for 1000's eg 13,045.90
  // use parseFloat to turn string into number with decimal place
  for(let i = 1; i <= colCount; i++){
    monthlyValues.push(parseFloat(table.get(7, i).replace(/,/g, '')))
  }
  // print(monthlyValues)
  // calculate min and max MW values from range
  minValue = min(monthlyValues)
  maxValue = max(monthlyValues)
  // set hot and cold colours
  minColour = color(14, 59, 237, 200)
  maxColour = color(237, 14, 14, 200)
  textAlign(CENTER, CENTER);
  noStroke()
  rectMode(CENTER)
  noLoop()
}
function draw() {
  background(0);
  // draw header
  textSize(36);
  fill(255)
  text(HEADERTEXT, width/2, TOPMARGIN/2);
  // declare temporary variables
  let x,y,d;
  // size values 
  let baseSize = 50;
  let extraSize = 200;
   // calculate a value from 0 to 1 based on the current MW value compared to precalculated min and max MW values
  let delta;
  for(let i = 0; i < monthlyValues.length; i++) {
    // calculate size
    d = baseSize + map(monthlyValues[i], minValue, maxValue, 0, extraSize);
    // calculate coords ensuring full shape visible
    x = random(d/2, width - d/2);
    y = random(d/2 + TOPMARGIN, height - d/2);
    delta = map(monthlyValues[i], minValue, maxValue, 0, 1)
    stroke(255)
    // use lerpColour to derive a colour value proportionally between cold and hot colours
    fill(lerpColor(minColour, maxColour, delta))
    rect(x, y, d)
    textSize(14);
    fill(0)
    noStroke()
    // add text label
    text(monthlyNames[i], x, y);
  }
}