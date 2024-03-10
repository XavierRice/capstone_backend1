const express = require('express');
require("dotenv").config()
const donations = express.Router()
const { getDonations, createDonations } = require('../queries/donations');
const { createStripeDonation} = ('../queries/stripeQueries')

donations.get('/', async (req, res) => {
    try {
        const donationsList = await getDonations(); 
        res.status(200).json(donationsList);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// get one donation
donations.get('/:donation_id', async (req, res) => {
    try {
        const { donation_id } = req.params;
        const donation = await getDonations(donation_id);
        res.status(200).json({ data: donation });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Create new donation
donations.post('/', async (req, res) => {
    try {
        const newDonation = await createDonations(req.body);
        res.status(201).json({ data: newDonation });
    } catch (err) {
        res.status(500).json({ error: "Invalid Information", info: err.message });
    }
});

module.exports = donations;
