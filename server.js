require('dotenv').config();

const express = require('express'); // library for server handling
const mongoose  = require('mongoose'); // library for conncetion to db
const Flight = require('./models/Flight') // flight model
const cors = require('cors');// library for handling react

const app = express();
app.use(cors()); //connect to fronthand
app.use(express.json()); // handel json requests

// insert an enrty
app.post('/flights', async (req, res) =>{
    const {Altitude, HIS, ADI} = req.body;
    try {
        const newFlight = new Flight({
            Altitude,
            HIS,
            ADI
        })
        const savedFlight = await newFlight.save();
        res.status(201).json(savedFlight);  // Respond with the saved flight data
    } catch(err) {
        res.status(400).json({ message: 'Error saving flight data: ' + err.message });
    };
})


// **GET** route to fetch all flight data
app.get('/flights', async (req, res) => {
    try {
      const lastEntry = await Flight.findOne().sort({_id:-1}); // Fetch the last flight records from the DB
      if (!lastEntry) {
        return res.status(404).json({ message: "No flights found" });
      }
      res.json(lastEntry);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching flight data: ' + err.message });
    }
  });

  app.get('/', (req, res) => {
    res.send("server is runnig");
});

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/airdb';

// connect to data base
mongoose.connect(MONGO_URI)
    .then(()=> {
        console.log('connected to db');
    })
    .catch(err =>{ 
        console.error("error connecting to db "+err);
    });

// Start the server
const PORT =  process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

