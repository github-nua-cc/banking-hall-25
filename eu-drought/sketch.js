/*
This template visualises Drought Impact per square meter in European Union Countries
data is taken from https://www.eea.europa.eu/en/datahub/featured-data/statistical-data/datahubitem-view/c7c868d8-95dc-4f23-9dde-4cdc2738cc4d
*/

// optional parameter to get data from just one country
//let geoCode = "FR";
// parameter to get data from just one year
let year = 2022;

// This vector is used to display the countries drought areas on the screen. It can be filled in different functions - for ex. getAreasForYear - as well as manually. Objects within the vector should be of type {country : String, area: Number, centre : {x: Number, y: Number}}
let droughtsToDisplay = [];
// list of countries of specific year. This array is updated in the getAresForYear function.
// let countries = [];

// list of
// let areas = [];
// let centres = [];
const HEADERTEXT = "EU Drought Data per Country";
const BOTTOMMARGIN = 52;

function preload() {}

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
  for (index in droughtsToDisplay) {
    const display = droughtsToDisplay[index];

    //draw area
    fill(200, 100, 0, 100);
    circle(
      display.centre.x,
      display.centre.y,
      (display.area / maximumDraughtArea) * windowHeight
    );

    //write country name
    fill(255);
    text(display.country, display.centre.x, display.centre.y);
  }
  textSize(36);
  textAlign(CENTER, CENTER);
  text(HEADERTEXT, width / 2, height - BOTTOMMARGIN / 2);
}
