# Food_Desert_US_Analysis

**Data Collection and Cleaning:**
To start, data on populations with low access to supermarkets, grouped by race and distance from supermarket by county, was pulled from the USDA Food Access Dept. of Research via XLXS (located at https://www.ers.usda.gov/data-products/food-access-research-atlas/download-the-data)
The data was cleaned to remove duplicative columns and streamline for grouped data by county; a cleaned CSV that will be used for the analysis can be found in the repository under "FoodAccessResearchDataCleanCSV". A summary of column names and descriptors are below, and can also be found in the CSV file "ColumnNameDescriptions"

**Column Name and Descriptions:**

![image](https://github.com/user-attachments/assets/738788d8-2ebd-4296-ba02-8b6449bb3e68)

**Database Creation and Collection:**
Once data was cleaned and a primary key of County, State was added to the file and the file was uploaded into a PostgreSQL database. Supporting SQL code to load the data into the local database is included in the repository under "database_dump.sql".
