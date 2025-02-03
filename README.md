# Food_Desert_US_Analysis

**Data Collection and Cleaning:**
To start, data on populations with low access to supermarkets, grouped by race and distance from supermarket by county, was pulled from the USDA Food Access Dept. of Research via XLXS (located at https://www.ers.usda.gov/data-products/food-access-research-atlas/download-the-data)
The data was cleaned to remove duplicative columns and streamline for grouped data by county; a cleaned CSV that will be used for the analysis can be found in the repository under "FoodAccessResearchDataCleanCSV". A summary of column names and descriptors are below, and can also be found in the CSV file "ColumnNameDescriptions"

**Column Name and Descriptions:**

![image](https://github.com/user-attachments/assets/738788d8-2ebd-4296-ba02-8b6449bb3e68)

**Database Creation and Collection:**
Once data was cleaned and a primary key of County, State was added to the file and the file was uploaded into a PostgreSQL database. Supporting SQL code to load the data into the local database is included in the repository under "database_dump.sql".


# Visualization 1: Population Heatmap and % Low-Access
  - This visualization was created in Javascript using Leaflet and D3. The file converts the data from CSV into JSON such that the GeoJSON functionality can take the latitude and longitude data and apply it to the Open City Data map. 
  - We applied iterative color markers to each county to help surface counties with the highest populations; Interactivity features include a mouse hover, which supplies each states' population and % Low Access _(those who live more than 1 mile from a supermarket in an urban area and more than 10 miles from a supermarket in rural areas)._
  - An example of a low-access county is highlighted below, where nearly 25% of residents are considered to be living in a "food desert". 
Another interactive function is a dropdown menu, which allows users to focus on a specific state of interest, rather than the total US.
  - To access this visualization, users should open a Local Host using Terminal _command: python -m http.server 8000_
  - **Business Application:** nationwide supermarket brands can use this map as an interactive reference to make informed decisions as to where they should build, focusing on US counties that have a high share of % Low Access, but also large population counts, such as neighborhoods in and around Atlanta Georgia (shown below)
  - **Resources used:** ColorBrewer for heatmap shading: https://colorbrewer2.org/#type=sequential&scheme=BuGn&n=3; Leaflet for GEOJSON and mapping: "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"; Open Street Map for mapping: <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'; D3 for CSV data reading: "https://d3js.org/d3.v7.min.js"

![image](https://github.com/user-attachments/assets/a6e36fce-eb01-4b4d-bce5-bc45d8007769)


