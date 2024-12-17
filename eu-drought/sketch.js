/*
This template visualises EU drought data per country
*/
//let geoCode = "FR";
let year = 2022;

let countries = [];
let areas = [];
let centres = [];
const HEADERTEXT = "EU Drought Data per Country";
const BOTTOMMARGIN = 52;

function preload() {
}

function setup() {
  calculateMaximumArea();
  getAreasForYear(year);
  createCanvas(windowWidth, windowHeight);
  noStroke();
}

function draw() {
  background(0);
  textSize(12);
  textAlign(LEFT, TOP);
  for(index in countries) {
    const country = countries[index];
    const area = areas[index] / maximumDraughtArea * windowHeight;
    const centre = centres[index];
    
    //draw area
    fill(200, 100, 0, 100);
    circle(centre.x, centre.y, area);

    //write country name
    fill(255);
    text(country, centre.x, centre.y);
  }
  textSize(36);
  textAlign(CENTER, CENTER);
  text(HEADERTEXT, width/2, height - BOTTOMMARGIN/2);
}
