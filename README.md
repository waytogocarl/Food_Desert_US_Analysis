# Food_Desert_US_Analysis
**Group 2:** Carleigh West, Toni Morgan Johnson, Marina Connolly, Jillian Walter, Andrey Aleksandrovich

**Data Collection and Cleaning:**
To start, data on populations with low access to supermarkets, grouped by race and distance from supermarket by county, was pulled from the USDA Food Access Dept. of Research via XLXS (located at https://www.ers.usda.gov/data-products/food-access-research-atlas/download-the-data)
The data was cleaned to remove duplicative columns and streamline for grouped data by county; a cleaned CSV that will be used for the analysis can be found in the repository under "FoodAccessResearchDataCleanCSV". A summary of column names and descriptors are below, and can also be found in the CSV file "ColumnNameDescriptions"

**Database Creation and Collection:**
Once data was cleaned and a primary key of County, State was added to the file and the file was uploaded into a PostgreSQL database. Supporting SQL code to load the data into the local database is included in the repository under "database_dump.sql".

**Column Name and Descriptions:**

![image](https://github.com/user-attachments/assets/738788d8-2ebd-4296-ba02-8b6449bb3e68)



# Visualization 1: Population Heatmap and % Low-Access
  - This visualization was created in Javascript using Leaflet and D3. The file converts the data from CSV into JSON such that the GeoJSON functionality can take the latitude and longitude data and apply it to the Open City Data map. 
  - We applied iterative color markers to each county to help surface counties with the highest populations; Interactivity features include a mouse hover, which supplies each states' population and % Low Access _(those who live more than 1 mile from a supermarket in an urban area and more than 10 miles from a supermarket in rural areas)._
  - Counties that are considered low-access are surfaced by being in a dark red color, as >25% of residents are considered to be in a "food desert"; counties highlighted with large circles indicate that the county has a high population.
  - To access this visualization, users should open a Local Host using Terminal _command: python -m http.server 8000_
  - **Business Application:** nationwide supermarket brands can use this map as an interactive reference to make informed decisions as to where they should build, focusing on US counties that have a high share of % Low Access, but also large population counts, such as neighborhoods in and around Atlanta Georgia (shown below)
  - **Personal Application:** potential home buyers or individuals looking to move can use this map to find counties that have strong grocery options, and avoid potential food deserts.
  - **Resources used:** ColorBrewer for heatmap shading: https://colorbrewer2.org/#type=sequential&scheme=BuGn&n=3; Leaflet for GEOJSON and mapping: "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"; Open Street Map for mapping: <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'; D3 for CSV data reading: "https://d3js.org/d3.v7.min.js"

![image](https://github.com/user-attachments/assets/a6e36fce-eb01-4b4d-bce5-bc45d8007769)

# Visualization 2: Top 10 Food Deserts in the US
- This visualization was created in Javascript using Leaflet for the street map view, and D3 for converting the data being stored in the csv file.
- This visual was constructed with the purpose of exposing the top 10 states with the worst food deserts. In order to accomplish our findings, we located the states with the largest total population where the nearest grocery store is  atleast 10 miles away.
- Hovering over the markers displays the state name and total population. Clicking on the markers reveals a population break down of the races and/or ethinics that are at least 10 miles away.
- The geographical coordinates for each of the top 10 states were hardcoded into the Javascript as the result of the datas' latitudes and longitudes being associated on a county and city level.
- ![Top 10 Food Deserts](https://github.com/user-attachments/assets/cc7fd599-8768-4f6b-ab6f-175cd5e38314)


# Visualization 3: Pie Chart on Low Food Access by Race
  - This visualization was created in Python using Bokeh library. The file connects the CSV database to read it in SQLite so we can make our queries.
  -  The goal of our visualization is to get the race with the lowest access to food. To do that, we can compare the LowAccess columns by race. We used the CASE statement to check each race and then used an aggregate function like MIN() to find the lowest access within 1/2 mile.
  -  We then created the Bokeh pie chart using Bokeh base template, and added Custom Title, Hover Tool, Percentage Label, Pie Slice Labels, Legend and improved the General Aesthetics.
  One example of the pie chart can be seen below:

<img width="662" alt="image" src="https://github.com/user-attachments/assets/ae59bc3a-bd90-4f10-a107-c1d36686bc20" />

- We then queried our database to find the Lowest Food Access by Race within 1 Mile and 10 Miles, and also created a pie chart based on the data found.

# Visualization 4: Top State with Lowest Access for Minority Populations & Grocery Store Locations by County
- The queries needed to create this visualization were created in Jupyter Notebook using Python, Pandas, and Sqlite3. Within the notebook we connected to the SQL database we built in order to query the states with the highest minority populations with the least access to supermarkets.
- It was found that Arizona had the highest minority populations with the least access to supermarkets, having the worst access occuring in 4 counties within the state. We focused on these four counties for the visualization.
- The visualization uses the filtered data from the Python queries as well as data from GEOJson. The python queries helped us to map the four counties with the least access and provided us with the data needed to show the miniority population counts in these counties. The GEOJson data helped us to map the supermarkets (with a limit of 100 in Urban areas, and a limit of 200 in Rural areas) within these counties.
- The map was created using Leaflet to show a streetmap view and an API to show the grocery store locations. Within the map you can select or deselect which county you'd like to look closer at, while seeing the supermarkets (within the limit) in that county. You can click on the county to see the minority population counts in these areas. You can click on the markers within the county to show the name and address of the supermarkets.
- **Business Application:** Small businesses or large corporations could use this map to identify areas that would benefit from the opening of a store and which Races and Ethnicities they would help to serve.
- **Personal Application:** If you are planning to move to Arizona you could use this map to decide in which county you'd prefer to live based on access to food. If you choose to live in one of these counties you can use the map to help plan which grocery store would be closest to you and how close/far you'd like to live from it.

![Screenshot 2025-02-05 at 5 18 02 PM](https://github.com/user-attachments/assets/9c6889f8-7c70-4f2c-a3f6-dc28ee692266)



# Ethical Considerations for our analysis:

This analysis uses census data, which contains information around individuals' race, income and SNAP benefit status. Individual respondent's information must be kept confidential in the census, as to not reveal financial status. Though the Graham-Leach-Bliley Act is aimed at Financial Institutions, the US Census takes similar steps to protect individual financial data, aggregating low-income and SNAP benefit information on the county level.

This case study also looks at data by individuals' race, which is subject to algorithmic bias should a machine learning algorithm be applied to the data to analyze further.

As with anything, Personal Bias may come into play for those who use the interactive maps when making business decisions around which areas to build - depending on % low access, race % makeup of total population, and income makeup of the areas they are building.

Additional considerations for data accuracy may be customers willing to answer the census at all, and those who do answer, answering truthfully. An article by the University of Virginia (https://guides.lib.virginia.edu/c.php?g=1357748&p=10025378) highlights the potential for data integrity loss due to changes in data processing post-COVID.

