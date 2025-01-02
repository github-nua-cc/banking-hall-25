let maximumDraughtArea = 0;

function calculateMaximumArea() {
  for (row of draughtInformation) {
    if (row[5] === "EU27_2020") continue; //ignore EU
    const draughtArea = Number(row[8]);
    if (draughtArea > maximumDraughtArea) maximumDraughtArea = draughtArea;
  }
}

function getAreasForYear(year) {
  //reset droughtsToDisplay vector to remove any previous data
  droughtsToDisplay = [];

  for (row of draughtInformation) {
    if (row[0] === "eu_sdg") continue; //skip first line
    if (row[5] === "EU27_2020") continue; //ignore whole of EU data
    if (Number(row[7]) != year) continue; //skip rows from another year

    //get info from row (country name and square meters of draught)
    const countryName = row[6];
    const draughtArea = Number(row[8]);

    //calculate new centre
    const newX = random(0, windowWidth);
    const newY = random(0, windowHeight);
    const centre = { x: newX, y: newY };

    //create object to push
    const newDisplay = {
      country: countryName,
      area: draughtArea,
      centre: centre,
    };

    //push all vectors
    droughtsToDisplay.push(newDisplay);
  }
}
