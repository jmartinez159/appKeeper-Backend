const express = require('express');
const redis = require('redis');
const app = express();
const port = 3000;

/* --- SETTING UP CONNECTION TO REDIS --- */

const redisURL = process.env.KEEPER_REDIS_URL;
const redisClient = redis.createClient({
  url: redisURL
});

async function setupRedis(){

  await redisClient.connect();
  const value = await redisClient.get('key');
  console.log('Retrieved from Redis: ', value);
}

//Check if redis client is connected
redisClient.on('connect', function() {
  console.log('Connected to Redis');
  console.log("Port is open for Redis Client: " + redisClient.isOpen);
});

redisClient.on('error', function (err) {
  console.error('Error connecting to Redis:', err);
});

//Calling function
setupRedis();

/* --- SETTING UP CORS POLICIES --- */
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Replace '*' with specific origins if needed
  res.header('Access-Control-Allow-Methods', 'GET, POST');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

//Middleware to parse json
app.use(express.json());

/* --- ROUTES --- */

// Default route
app.get('/', (req, res) => {
  
    res.send({'message': 'Hello from Backend'});
});

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
