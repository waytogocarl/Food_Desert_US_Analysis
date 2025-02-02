d3.csv('../../data/us_food_desert.csv').then(data => {
    // console.log(data); // Display the data in the console
    
    let stateTotals = {} //make object to hold totals per state

    data.forEach(row => { //log each race 10miles into it's own variable
        let state = row.State

        if (!stateTotals[state]) {
            stateTotals[state] = {
                WhitePop: 0,
                BlackPop: 0,
                AsianPop: 0,
                NHPIPop: 0, //Native Hawaiian/Other Pacific
                NAANPop: 0, //American Indian/Alaska Native
                HispanicPop: 0,
                Other: 0,
                TotalPopulation: 0
            }
        }

        // Accumulate values for each race; +row to convert string to number
        stateTotals[state].WhitePop += +row.LowAccessWhite_10M || 0 // This line adds the value of LowAccessWhite_10M from the current row to the whitepop of the corresponding state in stateTotals
        stateTotals[state].BlackPop += +row.LowAccessBlack_10M || 0
        stateTotals[state].AsianPop += +row.LowAccessAsian_10M || 0
        stateTotals[state].NHPIPop += +row.LowAccessNHPI_10M || 0
        stateTotals[state].NAANPop += +row.LowAccessNAAN_10M || 0
        stateTotals[state].HispanicPop += +row.LowAccessHispLatam_10M || 0
        stateTotals[state].Other += +row.LowAccessOther_10M || 0   

       // Calculate the total population for the state
        stateTotals[state].TotalPopulation = stateTotals[state].WhitePop +
                                            stateTotals[state].BlackPop +
                                            stateTotals[state].AsianPop +
                                            stateTotals[state].NHPIPop +
                                            stateTotals[state].NAANPop +
                                            stateTotals[state].HispanicPop +
                                            stateTotals[state].Other;



    }) //Closing to forEach
    

    // Create an array of states and their total populations
    let statePopulationArray = Object.keys(stateTotals).map(state => {
        return {state: state,
                whitepop: stateTotals[state].WhitePop,
                blackpop: stateTotals[state].BlackPop,
                asianpop: stateTotals[state].AsianPop,
                nhpipop: stateTotals[state].NHPIPop,
                naanpop: stateTotals[state].NAANPop,
                hispanicpop: stateTotals[state].HispanicPop,
                otherpop: stateTotals[state].Other,
                TotalPopulation: stateTotals[state].TotalPopulation
        }
    })



    // Sort the array in descending order based on total population
    statePopulationArray.sort((a, b) => b.TotalPopulation - a.TotalPopulation);

    // Select the top 10 states and their total populations
    let top10States = statePopulationArray.slice(0, 10);

    // Log the top 10 states, their total populations, and their counties
    console.log("Top 10 Total Population Per State");
    top10States.forEach(item => {
        console.log(`${item.state}: 
                    White Population: ${Number(item.whitepop).toLocaleString()}
                    Black Population: ${Number(item.blackpop).toLocaleString()}
                    Asian Population: ${Number(item.asianpop).toLocaleString()}
                    Native Hawaiian/Other Pacific: ${Number(item.nhpipop).toLocaleString()}
                    American Indian/Alaska Native: ${Number(item.naanpop).toLocaleString()}
                    Hispanic Population: ${Number(item.hispanicpop).toLocaleString()}
                    Other/Mixed Population: ${Number(item.otherpop).toLocaleString()}
                    Total State Population: ${Number(item.TotalPopulation).toLocaleString()}`); 
    
    const stateCoordinates = {
            "Texas": [31.9686, -99.9018],
            "Arizona": [34.0489, -111.0937],
            "New Mexico": [34.9727, -105.0324],
            "California": [36.7783, -119.4179],
            "Oklahoma": [35.0078, -97.0929],
            "Minnesota": [46.7296, -94.6859],
            "Mississippi": [32.3547, -89.3985],
            "Arkansas": [35.2010, -91.8318],
            "Missouri": [37.9643, -91.8318],
            "Kansas": [39.0119, -98.4842],
    }; //Manually pulled in geographical coordinates per state

    //Create Markers for top 10 states
    top10States.forEach(item => {
        const coordinates = stateCoordinates[item.state]
        if (coordinates) {
            const marker = L.marker(coordinates)
                .bindPopup(`
                    <div style="font-family: Merriwether, serif; text-align: left; 
                        border-radius: 0px; 
                        padding: 15px; 
                        background-color: #B1BAFA;  /* Change this to your desired color */
                        border: 2px solid #ccc;">
                        <h3 style="text-align: center;">Population Details</h3>
                        <ul style="list-style-type: none; padding: 0;">
                            <li><strong>White Population:</strong> ${Number(item.whitepop).toLocaleString()}</li>
                            <li><strong>Black Population:</strong> ${Number(item.blackpop).toLocaleString()}</li>
                            <li><strong>Asian Population:</strong> ${Number(item.asianpop).toLocaleString()}</li>
                            <li><strong>Native Hawaiian/Other Pacific:</strong> ${Number(item.nhpipop).toLocaleString()}</li>
                            <li><strong>American Indian/Alaska Native:</strong> ${Number(item.naanpop).toLocaleString()}</li>
                            <li><strong>Hispanic Population:</strong> ${Number(item.hispanicpop).toLocaleString()}</li>
                            <li><strong>Other/Mixed Population:</strong> ${Number(item.otherpop).toLocaleString()}</li>
                        </ul>
                    </div>
                `)
                .addTo(myMap)

            //Add tool tip for racial/ethinic counts
            marker.bindTooltip(`
                <div style="text-align: center; background-color: #B1BAFA; padding: 10px; border-radius: 5px;">
                    <h3 style="margin: 0;">${item.state}</h3> 
                    <h4 style="margin: 5px 0;">Total Population: ${Number(item.TotalPopulation).toLocaleString()}</h4>
                </div>`, {
                permanent: false,
                direction: 'top'
            });

        }
    })
});

}).catch(error => {
    console.error('Error loading the CSV file:', error)})
    

// Create map object
let myMap = L.map("map2", {
    center: [39.50, -98.35], 
    zoom: 5
})


// Add tile layer for the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);

