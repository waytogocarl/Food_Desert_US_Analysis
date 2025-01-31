// Initialize the map
var unitedStatesMap = L.map('map').setView([37.8, -96], 4);

// Add tile layer
var stateTiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(unitedStatesMap);

let geojsonLayer; // Store GeoJSON layer globally
let allData = []; // Store the full dataset

// Load CSV data
d3.csv("data/FoodAccessResearchDataCleanCSV_Updated.csv").then(function (data) {
    console.log("CSV Data Loaded:", data);

    let geojsonData = {
        "type": "FeatureCollection",
        "features": []
    };

    let statesSet = new Set();

    data.forEach(row => {
        let lat = parseFloat(row.latitude);
        let lng = parseFloat(row.longitude);
        let totalPop = parseFloat(row.TotalPopulation);
        let lowAccessPop = parseFloat(row.LowAccess_1MUrban_10MRural);

        if (isNaN(lat) || isNaN(lng) || isNaN(totalPop) || totalPop === 0) {
            console.warn("Skipping row due to invalid data:", row);
            return;
        }

        let percentLowAccess = ((lowAccessPop / totalPop) * 100).toFixed(2);

        let feature = {
            "type": "Feature",
            "properties": {
                "County_State": row.County_State,
                "State": row.State,
                "TotalPopulation": totalPop,
                "PercentLowAccess": percentLowAccess + "%"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [lng, lat]
            }
        };

        geojsonData.features.push(feature);
        statesSet.add(row.State);
    });

    console.log("GeoJSON Data:", geojsonData);

    if (geojsonData.features.length === 0) {
        console.error("No valid data points found.");
        return;
    }

    allData = geojsonData; // Store full dataset
    updateMap(geojsonData); // Initial full map load

    // Populate dropdown with states
    let stateFilter = document.getElementById("stateFilter");
    statesSet.forEach(state => {
        let option = document.createElement("option");
        option.value = state;
        option.textContent = state;
        stateFilter.appendChild(option);
    });

    // Add event listener for filtering
    stateFilter.addEventListener("change", function () {
        let selectedState = this.value;
        if (selectedState === "all") {
            updateMap(allData);
        } else {
            let filteredData = {
                "type": "FeatureCollection",
                "features": allData.features.filter(f => f.properties.State === selectedState)
            };
            updateMap(filteredData);
        }
    });
});

// Function to get color based on population
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

// Function to update map with new data
function updateMap(filteredData) {
    if (geojsonLayer) {
        unitedStatesMap.removeLayer(geojsonLayer);
    }

    geojsonLayer = L.geoJson(filteredData, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, {
                radius: 8,
                fillColor: getColor(feature.properties.TotalPopulation),
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.7
            });
        },
        onEachFeature: function (feature, layer) {
            let popupContent = `
                <strong>${feature.properties.County_State}</strong><br />
                Total Population: ${feature.properties.TotalPopulation}<br />
                % Low Access: ${feature.properties.PercentLowAccess}
            `;

            layer.bindPopup(popupContent);
            layer.bindTooltip(popupContent, { permanent: false, direction: "top" });
            layer.on('mouseover', function () { this.openTooltip(); });
            layer.on('mouseout', function () { this.closeTooltip(); });
        }
    }).addTo(unitedStatesMap);
}
