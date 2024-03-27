const express = require('express');
require("dotenv").config()
const keywords = express.Router()
const {combinedQuery} = require('../queries/combinedQuery')


keywords.get('/', async (req, res) => {
    const { keyword } = req.query;
    try {
        const KeywordEvents= await getEventsAndNewsByKeyword(keyword) 
        res.status(200).json(KeywordEvents);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports=keywords