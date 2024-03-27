const express = require("express");
require("dotenv").config();
const news = express.Router();
const { getNews, getOneArticle, createNews, searchNewsByKeyword } = require("../queries/news");

news.get("/", async (req, res) => {
  try {
    const { news_id } = req.params;
    const news = await getNews();
    res.status(200).json({ data: news });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

news.get('/search', async (req, res) => {
  try {
      const keyword = req.query.keyword; 
      const events = await searchNewsByKeyword(keyword); 
      res.status(200).json({ data: events }); 
  } catch (error) {
      res.status(500).json({ error: events }); 
  }
});

news.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const oneNews = await getOneArticle(id);
    res.status(200).json(oneNews);
  } catch (err) {
    res.status(404).json({ error: err });
  }
});

news.post("/", async (req, res) => {
  try {
    const newArticle = await createNews(req.body);
    res.status(201).json({ data: newArticle });
  } catch (err) {
    res.status(500).json({ error: "Invalid Information", info: err.message });
  }
});


module.exports = news;
