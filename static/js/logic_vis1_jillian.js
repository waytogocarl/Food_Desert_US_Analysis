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
        let totalPopulation = parseFloat(row.TotalPopulation);
        let lowAccessPop = parseFloat(row.LowAccess_1MUrban_10MRural);

        if (isNaN(lat) || isNaN(lng) || isNaN(totalPopulation) || totalPopulation === 0) {
            console.warn("Skipping row due to invalid data:", row);
            return;
        }

        let percentLowAccess = ((lowAccessPop / totalPopulation) * 100).toFixed(2);

        let feature = {
            "type": "Feature",
            "properties": {
                "County_State": row.County_State,
                "State": row.State,
                "TotalPopulation": totalPopulation,
                "PercentLowAccess": parseFloat(percentLowAccess) // Ensure it's a number
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

// Function to determine circle marker size based on Total Population
function getRadius(totalPopulation) {
    return totalPopulation > 1500000 ? 20 :
           totalPopulation > 1000000 ? 15 :
           totalPopulation > 500000  ? 12 :
           totalPopulation > 250000  ? 10 :
           totalPopulation > 100000  ? 8 :
           totalPopulation > 50000   ? 6 :
           totalPopulation > 25000   ? 4 :
                                       2;
}

// Function to get color based on % Low Access// left off here, want to play around with percentages
function getColor(percentLowAccess) {
    return percentLowAccess > 25 ? '#800026' :  // > 25%
           percentLowAccess > 20 ? '#E31A1C' :  // > 20%
           percentLowAccess > 15 ? '#FED976' :  // > 15%
           percentLowAccess > 10 ? '#F5F5F5' :  // > 10%
           percentLowAccess > 5  ? '#a1d76a' :  // > 5%
                                    '#2ca25f';   // < 5%
}

// Function to update map with new data
function updateMap(filteredData) {
    if (geojsonLayer) {
        unitedStatesMap.removeLayer(geojsonLayer);
    }

    geojsonLayer = L.geoJson(filteredData, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, {
                radius: getRadius(feature.properties.TotalPopulation),  
                fillColor: getColor(feature.properties.PercentLowAccess), 
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
                % Low Access: ${feature.properties.PercentLowAccess}%
            `;

            layer.bindPopup(popupContent);
            layer.bindTooltip(popupContent, { permanent: false, direction: "top" });
            layer.on('mouseover', function () { this.openTooltip(); });
            layer.on('mouseout', function () { this.closeTooltip(); });
        }
    }).addTo(unitedStatesMap);
}
