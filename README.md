# Application Keeper Backend
This application serves as the backend to the Application Keeper web browser extension. This application is in charge of handling request and communicating to the Redis database.

# How it works
Start server with `node server.js`

Server takes requests from the frontend(web browser extension) and then reads or sets data in the database. Server communicates with the Redis Cloud for quick responses.