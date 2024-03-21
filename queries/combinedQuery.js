const db = require('../db/dbConfig');

const getEventsAndNewsByKeyword = async (keyword) => {
    
    try {
        const eventsQuery = `
            SELECT
                'event' as type,
                event_id,
                event_title,
                event_date,
                event_time,
                event_location,
                event_details,
                event_photo
            FROM events
            WHERE $1 = ANY(event_keywords)
            ORDER BY event_date DESC;
        `;

        const newsQuery = `
            SELECT
                'news' as type,
                news_id,
                news_title,
                news_content,
                news_url,
                news_image
            FROM news
            WHERE $1 = ANY(news_keywords)
            ORDER BY news_id DESC;
        `;
        // You can execute both queries concurrently if your DB library supports it.
        // For example, using Promise.all for parallel execution.
        const [events, news] = await Promise.all([
            db.any(eventsQuery, [keyword]),
            db.any(newsQuery, [keyword])
        ]);
        // Combining both results into a single array
        // Optionally, you could keep them separate if that makes more sense for your application's use case
        const combinedResults = [...events, ...news];

        return combinedResults;
    } catch (err) {
        return err;
    }
}
