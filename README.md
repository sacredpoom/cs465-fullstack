# cs465-fullstack
CS-465 Full Stack Development with MEAN. 

The Travlr Getaways web application uses the MEAN stack, comprised of MongoDB, Express.js, Angular, and Node.js. The website uses a static front-end for handling customer interactions with a dynamic,
interactive SPA (Single Page Application) for administrative functions. 

The customer-facing front-end uses Node.js and Express.js to render static HTML content. Handlebars templating engine helps streamline design by injecting JSON into HTML for dynamic content delivery. The backend 
database supplying content is MongoDB, a flexible non-relational structure which is robust and scalable.

The administration portion of the Travlr web application is built using Angular as a SPA. The Angular framework allows for administrators to easily manage content without needing to refresh the page. To ensure system security,
 the SPA implements a user authentication process. Administrators are required to log in before they can manage content and user profiles for the Travlr Getaways application. The combination of Angular and Node.js offers a seamless and easy experience for managing the server data through a custom REST API.

**Architecture**\
The Express Framework with an MVC pattern is ideal for server-side rendering of a multi-page experience. This design facilitates Search Engine Optimization through easier indexing and allows users to navigate directly to relevant pages which only need to load that specific page's data.
The Angular SPA, on the other hand, allows for dynamic content changes without requiring the page to reload. Although this could require a longer initial page load time, it allows for complex workflows by maintaining state across interactions and not requiring additional page loads.

MongoDB is a NoSQL database that employs a schema-less architecture, using JSON-like documents. This complements the rest of the stack, which utilizes JavaScript, creating a natural synergy. This setup significantly accelerates development time by allowing the use of a single language across both front-end and back-end development.

**Functionality**\
JSON is a data exchange format that is used throughout all layers of the MEAN stack. JSON was injected into HTML through Handlebars, which allowed for numerous instances of code reusability and simplification. Headers and footers of the front-end web pages were rendered through partial layers and injections. Static HTML pages were converted to Handlebars templates with JSON data to render content dynamically.

**Testing**\
Communication between the front end and back end is done through APIs. An API Endpoint is a specific URL that acts as an entry point for functionalities such as GET/POST/PUT/DELETE. This application creates a custom REST API for CRUD operations to handle stateless interactions between the client and server. Authentication was added to this application by making use of JSON Web Tokens (JWT) to protect certain operations at endpoints. API endpoints were tested using Postman and verified with MongoDB Compass before integrating into the front end.

**Reflection**\
This course was my first experience developing a full stack application, and I learned a lot. This is not my first time building a RESTful API or using an MVC pattern, but this project felt like a culmination of the last several years of study. This course also helped me become much more comfortable using Git and PowerShell, uploading each week's work as a separate branch. I look forward to moving towards a career in full stack development, and this course provided hands-on experience working with the MEAN stack.

 ## Tools and Technologies
 - NPM v10.2.4
 - Node.js v20.11.1
 - angular/cli v17.3.3
 - express-generator v4.16.1
 - jquery v3.7.1
 - cookie-parser v1.4.6
 - crypto v1.0.1
 - debug v2.6.9
 - dotenv v16.4.5
 - express-jwt v8.4.1
 - express v4.19.2
 - hbs v4.2.0
 - http-errors v1.6.3
 - jsonwebtoken v9.0.2
 - mongoose v8.2.3
 - morgan 1.9.1
 - passport v0.7.0
 - MongoDB Community Server 7.0.8
 - MongoDB Compass v1.42.5
 - Postman v10.24

## Screenshots
![image](https://github.com/sacredpoom/cs465-fullstack/assets/20672168/a117a7f2-b08d-40d3-b233-297905ccf9cf)

![image](https://github.com/sacredpoom/cs465-fullstack/assets/20672168/09016a76-28d9-446b-b9dd-271466803b6a)

![image](https://github.com/sacredpoom/cs465-fullstack/assets/20672168/83df5cfc-4341-4206-bc5c-beea7a38e09d)

![image](https://github.com/sacredpoom/cs465-fullstack/assets/20672168/736e4d45-a57a-4956-8790-33c4c99415e2)

![image](https://github.com/sacredpoom/cs465-fullstack/assets/20672168/29f176ae-bbba-4816-90ff-eae80f5851a1)

![image](https://github.com/sacredpoom/cs465-fullstack/assets/20672168/b6b9c2ef-8aa6-4361-bf4a-e7c77cc46165)
