const db = require('../db/dbConfig')

const getNews = async () => {
    try {
       const news = await db.any("SELECT * FROM news")
       return news
    } catch (err) {
        return err
    }
}

const getOneArticle = async (id) => {
    try {
       const oneNews = await db.one("SELECT * FROM news WHERE news_id=$1", id);
       return oneNews;
    } catch (err) {
        return err;
    }
}

const createNews = async (news) => {
    try {
        const {  
                user_id,
                news_title,
                donation_id,
                news_content,
                news_url,
                news_image 
                } = news
        const newArticle = await db.one("INSERT INTO news (user_id, news_title, donation_id, news_content, news_url, news_image ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", [user_id, news_title, donation_id, news_content, news_url, news_image])
        return newArticle
    } catch (err) {
        return err
    }
}

const searchNewsByKeyword = async (keyword) => {
    try {
        const formattedKeyword = `%${keyword}%`;
        const news = await db.any(
            "SELECT * FROM news WHERE EXISTS (SELECT 1 FROM unnest(news_keywords) AS keyword WHERE LOWER(keyword) LIKE LOWER($1))",
            [formattedKeyword]
        );
        return news;
    } catch (err) {
        return err;
    }
};


module.exports = { getNews, getOneArticle, createNews, searchNewsByKeyword }