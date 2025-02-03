//adding a tile layer (the background map image) to our map
//use addTo method to add to map
let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map4);

// overlays that can be toggled on or off
let layers = {
  Arizona: new L.LayerGroup(),
  California: new L.LayerGroup()
};

// creating the map object
let map4 = L.map("map4", {
  center: [37.8, -96],
  zoom: 4,
  layers : [
    layers.Arizona,
    layers.California
  ]
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