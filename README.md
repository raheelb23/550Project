# CIS550_Sunrise
Welcome to Sunrise Final Group Project!
We build a web app called "The Next Binge" which will recommend TV shows based on user selections of various information such as Genre, Director, Rating, etc. 
Website also provides a Watch-list function to allow user to save the TV shows they are interested in watching. 
Demo Link: https://drive.google.com/file/d/1g3BP75X5HgmG8UYuVQ0SfRGum3OmdnaA/view?usp=sharing 
This repo include following files:
Main Page
  ● CIS550_Sunrise_Pre-Processing_Code in both .ipynb and .py formats
  ● Final report submitted for the project 
  ● Appendix from the report containing all queries used in the project
/server: This folder holds the server application files and dependencies (as required by Node.js).
  ● config.json: Holds the RDS connection credentials/information and application configuration settings (like port and host).
  ● package.json: maintains the project dependency tree; defines project properties, scripts,etc
  ● package-lock.json: saves the exact version of each package in the application dependency tree for installs and maintenance.
  ● routes.js: This is thie file that holds all API routes’ handler functions. 
  ● server.js: The code for the routed HTTP application. It imports routes.js and maps each route function to an API route and type (like GET, POST, etc). 
/client
  ● package.json: maintains the project dependency tree; defines project properties, scripts, etc
  ● package-lock.json: saves the exact version of each package in the application dependency tree for installs and maintenance
/client/public: This folder contains static files like index.html file, images and assets like robots.txt for specifying web page titles, et cetera
/client/src: This folder contains the main source code for the React application. Specifically:
  ● config.json: Holds server connection information (like port and host). 
  ● fetcher.js: Contains helper functions that wrap calls to API routes. 
  ● index.js: This the main JavaScript entry point to the application and stores the main DOM render call in React. 
  ● /pages This folder contains files for React components corresponding to the three pages in the application These are:
    ○ LandingPage.js: The landing page, provides a welcome message to user
    ○ BasicSearch.js: This page displays all the TV shows in the database and gives the user the option to conduct some basic searches. For example, 
      user can search TV shows written by certain writer or directed by certain director. 
    ○ SearchByBirthyear.js: This page asks the user to provide their birth year and display TV shows that are related to this year. 
      For example, this page can display TV shows that were actively running in the year user was born. This page also displays all the directors', 
      writers' and actors' work who share user's birth year respectively. 
    ○ AdvancedSearchPage.js: This page provides user the opportunity to mix and match different requests to generate search results. 
      User is able to provide multiple search criteria at once. For example, user can ask the website to display all TV shows that are directed and written by 
      Ricky Gervais that has 8 or above rating, the website will display all the shows that meet all of the user's search input.
    ○ WatchListPage.js: This page will display all the TV shows that user added in their personal list while browsing on the other pages. 
      This page also allows user to delete unwanted TV shows from their watch list.
  ● /components Similar to the /pages folder, but this folder contains files for React components corresponding to smaller, reusable components, especially those used 
  by pages. In this application, this is only the top navigation bar (described in MenuBar.js) used by all pages. 
List of Packages needed to run:
  "@testing-library/jest-dom": "^5.16.4",
    "@testing-library/react": "^12.1.4",
    "@testing-library/user-event": "^13.5.0",
    "antd": "^4.19.5",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "react-router-dom": "^6.3.0",
    "react-scripts": "5.0.0",
    "shards-react": "^1.0.3",
    "web-vitals": "^2.1.4"
