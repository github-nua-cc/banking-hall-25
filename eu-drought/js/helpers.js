/**
 * This file uses the variable draughtInformation which is created and filled from the csv-management.js file. This variable contains the data in data/droughts.csv parsed for JS. You should never change the files droughts.csv nor csv-management.js.
 */

/**
 * Calculate the maximum draught area from the information stored in the draughtInformation variable
 * @returns maximumArea - the maximum area in square meters found in the list of draughts per year
 */
function calculateMaximumArea() {
  // start maximum at zero
  let maximumArea = 0;

  // loop through all rows in the CSV
  for (row of draughtInformation) {
    if (row[5] === "EU27_2020") continue; //ignore whole of EU information

    // get area of current row
    const draughtArea = Number(row[8]);

    // if current area is bigger than current maximum, update maximum
    if (draughtArea > maximumArea) maximumArea = draughtArea;
  }

  // at end -> return maximum
  return maximumArea;
}

/**
 * Get the drought areas in the correct format for a specific given year
 * @param {Number} year
 * @returns array of objects of type {country: String, area: Number, centre: {x: Number, y: Number}} storing data of given year
 */
function getAreasForYear(year) {
  // initialize vector as empty
  let droughtsToDisplay = [];

  // loop through information stored in the draughtInformation variable
  for (row of draughtInformation) {
    if (row[0] === "eu_sdg") continue; //skip first line
    if (row[5] === "EU27_2020") continue; //ignore whole of EU data
    if (Number(row[7]) !== year) continue; //skip rows from another year

    //get info from row (country name and square meters of draught)
    const countryName = row[6];
    const draughtArea = Number(row[8]);

    //calculate new random centre and store in correctly formatted variable
    const newX = random(0, windowWidth);
    const newY = random(0, windowHeight);
    const centre = { x: newX, y: newY };

    //create object & push to droughtsToDisplay vector
    const newDisplay = {
      country: countryName,
      area: draughtArea,
      centre: centre,
    };
    droughtsToDisplay.push(newDisplay);
  }

  // return the complete list of droughts to display
  return droughtsToDisplay;
}
