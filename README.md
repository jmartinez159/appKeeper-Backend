# Application Keeper Backend
This application serves as the backend to the Application Keeper web browser extension. This application is in charge of handling request and communicating to the Redis database.

# About
Server receives a key from the frontend web extension and then either looks in the database for a matching key or creates a new entry with the given key and date. This application uses Redis Cloud for quick responses to requests.

# How To Use
Start server with `node server.js`