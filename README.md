# Food_Desert_US_Analysis

**Data Collection and Cleaning:**
To start, data on populations with low access to supermarkets, grouped by race and distance from supermarket by county, was pulled from the USDA Food Access Dept. of Research via XLXS (located at https://www.ers.usda.gov/data-products/food-access-research-atlas/download-the-data)
The data was cleaned to remove duplicative columns and streamline for grouped data by county; a cleaned CSV that will be used for the analysis can be found in the repository under "FoodAccessResearchDataCleanCSV". A summary of column names and descriptors are below, and can also be found in the CSV file "ColumnNameDescriptions"

**Column Name and Descriptions:**

![image](https://github.com/user-attachments/assets/738788d8-2ebd-4296-ba02-8b6449bb3e68)

**Database Creation and Collection:**
Once data was cleaned and a primary key of County, State was added to the file and the file was uploaded into a PostgreSQL database. Supporting SQL code to load the data into the local database is included in the repository under "database_dump.sql".


**Visualization 1: Population Heatmap and % Low-Access**
  - This visualization was created in Javascript using Leaflet and D3. The file converts the data from CSV into JSON such that the GeoJSON functionality can take the latitude and longitude data and apply it to the Open City Data map. 
  - We applied iterative color markers to each county to help surface counties with the highest populations; Interactivity features include a mouse hover, which supplies each states' population and % Low Access _(those who live more than 1 mile from a supermarket in an urban area and more than 10 miles from a supermarket in rural areas)._
  - An example of a low-access county is highlighted below, where nearly 25% of residents are considered to be living in a "food desert". 
Another interactive function is a dropdown menu, which allows users to focus on a specific state of interest, rather than the total US.
  - **Business Application:** nationwide supermarket brands can use this map as an interactive reference to make informed decisions as to where they should build, focusing on US counties that have a high share of % Low Access, such as the below Putnam County in New York.

![image](https://github.com/user-attachments/assets/386a4feb-b5d5-4bae-a644-637610da9ff3)

