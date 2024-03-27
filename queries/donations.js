const db = require('../db/dbConfig');

const createDonations = async (donationData) => {
    const { user_id, event_id, donation_amount, stripe_button, donation_keyword, donation_description } = donationData;
    try {
        const newDonation = await db.one(
            'INSERT INTO donations (user_id, event_id, donation_amount, stripe_button, donation_keyword, donation_description) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [user_id, event_id, donation_amount, stripe_button, donation_keyword, donation_description]
        );
        return newDonation;
    } catch (error) {
        throw new Error(`Error creating donation: ${error.message}`);
    }
};

const getDonations = async (donation_id) => {
    try {
        if (donation_id) {
            // Fetch a specific donation
            const donation = await db.one('SELECT * FROM donations WHERE donation_id = $1', [donation_id]);
            return donation;
        } else {
            // Fetch all donations
            const donations = await db.any('SELECT * FROM donations');
            return donations;
        }
    } catch (error) {
        if (error.message === 'No data returned from the query.') {
            return null;
        }
        throw new Error(`Error fetching donations: ${error.message}`);
    }
};

module.exports = { getDonations, createDonations };
