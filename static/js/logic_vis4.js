//adding a tile layer (the background map image) to our map
//use addTo method to add to map
let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// overlays that can be toggled on or off
let layers = {
  Maricopa_County: new L.LayerGroup(),
  Apache_County: new L.LayerGroup(),
  Coconino_County: new L.LayerGroup(),
  Mohave_County: new L.LayerGroup()
};

// creating the map object
let map4 = L.map("map4", {
  center: [34, -115],
  zoom: 6,
  layers : [
    layers.Maricopa_County,
    layers.Apache_County,
    layers.Coconino_County,
    layers.Mohave_County
  ]
});

//add the streetmap tile layer to the map
streetmap.addTo(map4);

// create an overlays object to add to our layer control
let overlays = {
  "Maricopa County": layers.Maricopa_County,
  "Apache County": layers.Apache_County,
  "Coconino County": layers.Coconino_County,
  "Mohave County": layers.Mohave_County
};

//function to fetch grocery store data
const apiKey = '9783ecca11d54a07b95e3cacf782f98c';
//define coordinates for specified counties within california and arizona
const arizonaCounties = [
  {
    name: "Apache County",
    bbox: [-110.000705, 33.475417, -109.045172, 36.999389],
    layer: layers.Apache_County,
    type: 'rural'
  },
  {
    name: "Coconino County",
    bbox: [-113.354176, 34.258411, -110.750671, 37.003102],
    layer: layers.Coconino_County,
    type: 'rural'
  },
  {
    name: "Maricopa County",
    bbox: [-113.335075, 32.505059, -111.039905, 34.04817],
    layer: layers.Maricopa_County,
    type: 'urban'
  },
  {
    name: "Mohave County",
    bbox: [-114.754681, 34.209626, -112.529225, 37.000821],
    layer: layers.Mohave_County,
    type: 'rural'
  }
];

//define countyDemographics
const countyDemographics = {
  "Apache County": {
    americanNative: "30,173"
  },
  "Coconino County": {
    americanNative: "13,349",
    asian: "249"
  },
  "Maricopa County": {
    hispanicLatino: "8,656",
    nativeHawaiian: "42",
    asian: "148",
    africanAmerican: "497",
    otherMultiples: "5,666",
    additionalInfo: "397,474"
  },
  "Mohave County": {
    nativeHawaiian: "51"
  }
};

//use a bounding box to show all of the stores within that bounding box (aka california or arizona)
function fetchGroceryStores(countyName, bbox, layerGroup, type) {
  //set a limit based on the county type
  const limit = type === 'urban' ? 100 : 200;
  const url = `https://api.geoapify.com/v2/places?categories=commercial.supermarket&filter=rect:${bbox.join(",")}&limit=${limit}&apiKey=${apiKey}`;

  console.log(`Fetching grocery stores in ${countyName} with a limit of ${limit}...`);

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      console.log(`Grocery stores in ${countyName}:`, data.features);

      data.features.forEach(store => {
        const { coordinates } = store.geometry;
        const { formatted, name } = store.properties;

        // create a marker at the stores location
        L.marker([coordinates[1], coordinates[0]])
          .bindPopup(`<strong>${name || "Supermarket"}</strong><br><em>${formatted}</em>`)
          .addTo(layerGroup);
      });

      //draw bounding box for the county
      drawBoundingBox(bbox, countyName, layerGroup);
    })
    .catch(error => console.error(`Error fetching grocery store locations for ${countyName}:`, error));
}

//function to draw bounding box
function drawBoundingBox(bbox, countyName, layerGroup) {
  //log bounding box values for debuggin
  console.log(`Drawing bounding box for ${countyName}:`, bbox);
  //ensure the box has four values
  if (!bbox || bbox.length !==4 || bbox.includes(undefined)) {
    console.error(`Invalid bounding box for ${countyName}:`, bbox);
    return;
  }

  //demographics for the county
  const demographics = countyDemographics[countyName] || {};

  //create an array to store only th fields that have values
  let popupList = [];

  if (demographics.hispanicLatino) {
    popupList.push(`<li><strong>Hispanic or Latino Population Count beyond 10 Miles from Supermarket:</strong> ${demographics.hispanicLatino}</li>`)
  }
  if (demographics.americanNative) {
    popupList.push(`<li><strong>American Indian or Alaska Native Population Count beyond 10 Miles from Supermarket:</strong> ${demographics.americanNative}</li>`)
  }
  if (demographics.asian) {
    popupList.push(`<li><strong>Asian Population Count beyond 10 Miles from Supermarket:</strong> ${demographics.asian}</li>`)
  }
  if (demographics.nativeHawaiian) {
    popupList.push(`<li><strong>Native Hawaiian or Other Pacific Islander Population Count beyond 10 Miles from Supermarket:</strong> ${demographics.nativeHawaiian}</li>`)
  }
  if (demographics.africanAmerican) {
    popupList.push(`<li><strong>Black or African American Population Count beyond 10 Miles from Supermarket:</strong> ${demographics.africanAmerican}</li>`)
  }
  if (demographics.otherMultiples) {
    popupList.push(`<li><strong>Other/Multiple race Population Count beyond 10 Miles from Supermarket:</strong> ${demographics.otherMultiples}</li>`)
  }
  if (demographics.additionalInfo) {
    popupList.push(`<li><strong>Population count beyond 1 mile for urban areas or 10 miles for rural areas from Supermarket:</strong> ${demographics.additionalInfo}</li>`)
  }

  const popupContent = `
    <div class="custom-popup">
      <b>${countyName}</b><br>
      ${popupList.length > 0 ? `<ul>${popupList.join("")}</ul>` : "<p>No Demographic data available.</p>"}
    </div>
  `;

  const rectangle = L.rectangle([
    [bbox[1], bbox[0]], //southwest corner
    [bbox[3], bbox[2]]
  ], {
    color: "#b1bafa",
    weight: 2,
    fillOpacity: 0.3
  }).addTo(layerGroup);

  //make a popup to show county nae when you click on the box
  rectangle.bindPopup(popupContent);
}

//fetch grocery stores for each county
arizonaCounties.forEach(county => {
  fetchGroceryStores(county.name, county.bbox, county.layer, county.type);
});

//create a control for our layers and add our overlays to it
L.control.layers(null, overlays).addTo(map4);


