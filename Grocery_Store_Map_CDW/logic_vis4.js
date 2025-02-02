//adding a tile layer (the background map image) to our map
//use addTo method to add to map
let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// overlays that can be toggled on or off
let layers = {
  Arizona: new L.LayerGroup(),
  California: new L.LayerGroup()
};

// creating the map object
let myMap = L.map("map4", {
  center: [37.8, -96],
  zoom: 4,
  layers : [
    layers.Arizona,
    layers.California
  ]
});