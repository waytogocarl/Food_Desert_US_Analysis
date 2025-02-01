const sqlite3 = require('sqlite3').verbose();

// Connect to SQLite database
let db = new sqlite3.Database('my_database.sqlite', sqlite3.OPEN_READONLY, (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});
// Query the database
db.all("SELECT * FROM my_table", [], (err, rows) => {
    if (err) {
        throw err;
    }
    console.log(rows); // Print all data from the table
});
// Close the database connection
db.close((err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Closed the database connection.');
});

// creating the map object
let myMap = L.map("map4", {
    center: [37.8, -96],
    zoom: 4
});

//adding a tile layer (the background map image) to our map
//use addTo method to add to map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);
