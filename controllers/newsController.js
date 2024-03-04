const express = require("express");
require("dotenv").config();
const news = express.Router();
const { getNews, getOneArticle, createNews } = require("../queries/news");

news.get("/", async (req, res) => {
  try {
    const { news_id } = req.params;
    const news = await getNews();
    res.status(200).json({ data: news });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
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
