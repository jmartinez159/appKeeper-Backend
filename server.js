const express = require('express');
const app = express();
const port = 3000;

// Set CORS headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Replace '*' with specific origins if needed
  res.header('Access-Control-Allow-Methods', 'GET, POST');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

//Middleware to parse json
app.use(express.json());

// Your other routes and logic here

// Default route
// app.get('/', (req, res) => {

//     console.log('GET route activated');
//     res.send({'message': 'Hello from Backend'});
// });

// This route checks if url in req is in the backend or not
app.post('/', (req, res) => {

    console.log('POST route activated');
    console.log(req.body);
    res.send({'message': 'POST Request received'});
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
