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

app.post('/check', async (req, res) => {

  console.log('Post Request Check: ');
  console.log('KEY: ', req.body.KEY);
  let key = req.body.KEY;
  let entry = await redisClient.get(key);
  console.log('Redis checked: ', entry);
  res.send({'message': 'Checked'});
});

// This route 
app.post('/submit', async (req, res) => {

    console.log('POST Request Submit: ');
    console.log('KEY: ', req.body.KEY);
    console.log('DATE: ', req.body.DATE);
    let key = req.body.KEY;
    let date = req.body.DATE;
    await redisClient.set(key, date);
    let newEntry = await redisClient.get(key);
    console.log('New Entry From Redis', newEntry);
    res.send({'message': 'Submitted'});
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
