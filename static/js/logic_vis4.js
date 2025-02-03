//adding a tile layer (the background map image) to our map
//use addTo method to add to map
let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// overlays that can be toggled on or off
let layers = {
  Arizona: new L.LayerGroup(),
  California: new L.LayerGroup()
};

// creating the map object
let map4 = L.map("map4", {
  center: [34, -115],
  zoom: 5,
  layers : [
    layers.Arizona,
    layers.California
  ]
});

//add the streetmap tile layer to the map
streetmap.addTo(map4);

//function to fetch grocery store data
const apiKey = '9783ecca11d54a07b95e3cacf782f98c';
//define coordinates for california and arizona
const locations = [
  { 
    state: "California", 
    latitude: 36.7783, 
    longitude: -119.4179,
    counties: ["Los Angeles County", "Riverside County", "San Bernardino County", "San Diego County", "Kern County", "Imperial County", "Kern County", "Lassen County", "Yolo County"]
  },
  { 
    state: "Arizona", 
    latitude: 34.0489, 
    longitude: -111.0937,
    counties: ["Maricopa County", "Pinal County", "Pima County", "Apache County", "Navajo County", "Coconino County", "Graham County", "Mohave County"]
   }
];
 
function fetchGroceryStores(latitude, longitude, state, allowedCounties, map4) {
  const url = `https://api.geoapify.com/v2/places?categories=commercial.supermarket&bias=proximity:${longitude},${latitude}&limit=20&apiKey=${apiKey}`;

  console.log(`Fetching grocery stores near ${state}...`);

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`API request faild: ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      console.log(`Grocery stores in ${state}:`, data.features);

      data.features.forEach(store => {
        const { coordinates } = store.geometry;
        const { formatted, name, county } = store.properties;

        if (allowedCounties.includes(county)) {
        // create a marker at the stores location
          L.marker([coordinates[1], coordinates[0]])
            .bindPopup(`<strong>${name || "Supermarket"}</strong><br>${formatted}`)
            .addTo(map4);
        }
      });
    })
    .catch(error => console.error(`Error fetching grocery store locations for ${state}:`, error));
}

locations.forEach(location => {
  fetchGroceryStores(location.latitude, location.longitude, location.state, location.counties, map4);
});


// create an overlays object to add to our layer control
let overlays = {
  "Arizona": layers.Arizona,
  "California": layers.California
};

//create a control for our layers and add our overlays to it
L.control.layers(null, overlays).addTo(map4);

//create a legend
let info = L.control({
  position: "bottomright"
});

//insert a div with a class of legend
info.onAdd = function() {
  let div = L.DomUtil.create("div", "legend");
  return div;
};

//add the info legend to the map
info.addTo(map4);

// map2.on('click', function (e) {
  //const lat = e.latlng.lat;
  //const lon = e.latlng.lng;

  //console.log("Fetching grocery stores near:", lat, lon);

  //const url = `https://api.geoapify.com/v2/places?categories=commercial.grocery&bias=proximity:${lon},${lat}&limit=20&apiKey=${apiKey}`;

  //fetch(url)
      //.then(response => response.json())
      //.then(data => {
          //console.log("Geoapify Response:", data);
          //data.features.forEach(feature => {
              //const { coordinates } = feature.geometry;
              //L.marker([coordinates[1], coordinates[0]])
                  //.bindPopup(`<b>${feature.properties.name}</b>`)
                  //.addTo(map2);
          //});
      //})
      //.catch(error => console.error("Error fetching grocery store locations:", error));
//});
