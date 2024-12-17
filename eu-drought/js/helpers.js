let maximumDraughtArea = 0;

function calculateMaximumArea() {
  for (row of draughtInformation) {
    if (row[5] === "EU27_2020") continue; //ignore EU
    const draughtArea = Number(row[8]);
    if (draughtArea > maximumDraughtArea) maximumDraughtArea = draughtArea;
  }
}

function getAreasForYear(year) {
  countries = [];
  areas = [];
  centres = [];
  for (row of draughtInformation) {
    if (row[0] === "eu_sdg") continue; //skip first line
    if (row[5] === "EU27_2020") continue; //ignore EU
    if (Number(row[7]) != year) continue; //only get rows from that year

    //get info
    const countryName = row[6];
    const draughtArea = Number(row[8]);

    //calculate new centre
    const newX = random(0, windowWidth);
    const newY = random(0, windowHeight);
    const centre = { x: newX, y: newY };

    //push all vectors
    countries.push(countryName);
    areas.push(draughtArea);
    centres.push(centre);
  }
}
