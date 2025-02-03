console.log("Adding map to page")

// Load CSV data
d3.csv("data/FoodAccessResearchDataCleanCSV_Updated.csv", function (data) {
  console.log("CSV Data Loaded:", data);
  createFeatures(data);
});

// Function to create features on the map
function createFeatures(foodInsecurityData) {
  // Define a function that we want to run once for each feature in the features array
  function onEachFeature(feature, layer) {
    layer.bindPopup(`Location: ${feature.properties.location}<br>Food Insecurity Rate: ${feature.properties.rate}%`);
  }

  // Create a GeoJSON layer that contains the features array on the foodInsecurityData object
  let foodInsecurityLayer = L.geoJSON(foodInsecurityData, {
    onEachFeature: onEachFeature,
    style: function(feature) {
      return {
        color: getColor(feature.properties.rate), // Use a function to determine color based on the rate
        weight: 2,
        fillOpacity: 0.7
      };
    }
  });

  // Send our food insecurity layer to the createMap function
  createMap(foodInsecurityLayer);
}

// Function to determine color based on food insecurity rate
// function getColor(rate) {
//   return rate > 20 ? '#800026' :
//          rate > 15 ? '#BD0026' :
//          rate > 10 ? '#E31A1C' :
//          rate > 5  ? '#FC4E2A' :
//                      '#FFEDA0';
// }


function getColor(population) {
  return population > 1500000 ? '#800026' :
         population > 1000000  ? '#BD0026' :
         population > 500000   ? '#E31A1C' :
         population > 250000   ? '#FC4E2A' :
         population > 100000   ? '#FD8D3C' :
         population > 50000    ? '#FEB24C' :
         population > 25000    ? '#FED976' :
                                 '#FFEDA0';
}


// Function to create the map
function createMap(foodInsecurityLayer) {
  // Create the base layers
  let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  });

  // Create a baseMaps object
  let baseMaps = {
    "Street Map": street
  };

  // Create an overlay object to hold our overlay
  let overlayMaps = {
    "Food Insecurity": foodInsecurityLayer
  };

  // Create our map, giving it the streetmap and food insecurity layers to display on load
  let myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 4,
    layers: [street, foodInsecurityLayer]
  });

  // Create a layer control
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
}