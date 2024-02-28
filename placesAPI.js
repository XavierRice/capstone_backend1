const express = require('express')
const axios = require('axios')
const cors = require('cors')
require('dotenv').config()

const places = express()

// Define your Google Maps API endpoint
const BASE_URL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
const API_KEY = process.env.X_GOOGLE_MAPS_API_KEY

places.use(cors())

places.get('/places', async (req, res) => {
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          key: API_KEY,
          ...req.query // Forward query parameters from the client to the Google Maps API
        }
      });
      res.json(response.data);
    } catch (error) {
      res.status(error.response.status).json(error.response.data);
    }
  });