console.log("Adding map to page");

let myMap = L.map("map", {
  center: [37.09, -95.71], 
  zoom: 4  // Try increasing this value
});

// Add a tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Load CSV data
d3.csv("../data/FoodAccessResearchDataCleanCSV_Updated.csv").then(function (data) {
  console.log("CSV Data Loaded:", data);

  // Convert CSV data to map points
  let foodInsecurityLayer = L.layerGroup();

  data.forEach(row => {
    let lat = parseFloat(row.latitude);
    let lon = parseFloat(row.longitude);
    // let rate = parseFloat(row.FoodInsecurityRate); 
    let rate = parseFloat(row.LowAccess_1MUrban_10MRural);
    console.log(`Adding marker at: ${lat}, ${lon}`);

    if (!isNaN(lat) && !isNaN(lon)) {
      let circle = L.circleMarker([lat, lon], {
        radius: 6,
        color: getColor(rate),
        fillColor: getColor(rate),
        fillOpacity: 0.7
      }).bindPopup(`Location: ${row.Location}<br>Food Insecurity Rate: ${rate}%`);

      foodInsecurityLayer.addLayer(circle);
    }
  });

  myMap.addLayer(foodInsecurityLayer);
});

// Function to determine color based on food insecurity rate
function getColor(rate) {
  return rate > 20 ? '#800026' :
         rate > 15 ? '#BD0026' :
         rate > 10 ? '#E31A1C' :
         rate > 5  ? '#FC4E2A' :
                     '#FFEDA0';
}
