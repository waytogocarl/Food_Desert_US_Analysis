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
  - **Resources used:** ColorBrewer for heatmap shading: https://colorbrewer2.org/#type=sequential&scheme=BuGn&n=3; Leaflet for GEOJSON and mapping: "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"; Open Street Map for mapping: <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'; D3 for CSV data reading: "https://d3js.org/d3.v7.min.js"

![image](https://github.com/user-attachments/assets/a6e36fce-eb01-4b4d-bce5-bc45d8007769)


# Ethical Considerations for our analysis:

This analysis uses census data, which contains information around individuals' race, income and SNAP benefit status. Individual respondent's information must be kept confidential in the census, as to not reveal financial status. Though the Graham-Leach-Bliley Act is aimed at Financial Institutions, the US Census takes similar steps to protect individual financial data, aggregating low-income and SNAP benefit information on the county level.

This case study also looks at data by individuals' race, which is subject to algorithmic bias should a machine learning algorithm be applied to the data to analyze further.

As with anything, Personal Bias may come into play for those who use the interactive maps when making business decisions around which areas to build - depending on % low access, race % makeup of total population, and income makeup of the areas they are building.

Additional considerations for data accuracy may be customers willing to answer the census at all, and those who do answer, answering truthfully. An article by the University of Virginia (https://guides.lib.virginia.edu/c.php?g=1357748&p=10025378) highlights the potential for data integrity loss due to changes in data processing post-COVID.
