const db = require('../db/dbConfig')

const getEvents = async () => {
    try {
       const events = await db.any("SELECT * FROM events")
       return events
    } catch (err) {
        return err
    }
}


//get one event!!
const getOneEvent = async (eventId) => {
    try {
       const event = await db.one("SELECT * FROM events WHERE event_id=$1", eventId);
       return event;
    } catch (err) {
        return err;
    }
}




const createEvent = async (event) => {
    try {
        const {  
                event_title,
                event_date,
                event_time,
                lat,
                lng,
                event_keywords,
                event_location,
                event_details,
                event_photo,
                is_virtual,
                accept_donation,
                rsvp,
                stripe_id
                } = event
        const rsvpValue = event.rsvp || false
        const newEvent = await db.one("INSERT INTO events (event_title, event_date, event_time, lat, lng, event_keywords, event_location, event_details, event_photo, is_virtual, accept_donation, rsvp, stripe_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *", [event_title, event_date, event_time, lat, lng, event_keywords, event_location, event_details, event_photo, is_virtual, accept_donation, rsvp, stripe_id])
        return newEvent
    } catch (err) {
        return err
    }
}

const updateEvent = async (id, event) => {
    try {
        const {  
                user_id,
                event_title,
                event_date,
                event_time,
                lat,
                lng,
                event_keywords,
                event_location,
                event_details,
                event_photo,
                is_virtual,
                accept_donation,
                stripe_id
                } = event
        const updatedEvent = await db.one("UPDATE events SET user_id=$1, event_title=$2, event_date=$3, event_time=$4, lat=$5, lng=$6, event_keywords=$7, event_location=$8, event_details=$9, event_photo=$10, is_virtual=$11, accept_donation=$12, stripe_id=$13 RETURNING *", [user_id, event_title, event_date, event_time, lat, lng, event_keywords, event_location, event_details, event_photo, is_virtual, accept_donation, stripe_id, id])
        return updatedEvent
    } catch (err) {
        return err
    }
}

const deleteEvent = async (id) => {
    try {
        const deletedEvent = await db.one("DELETE FROM events WHERE event_id=$1 RETURNING *", id)
        return deletedEvent
    } catch (err) {
        return err
    }
}


module.exports = { getEvents, getOneEvent, createEvent, updateEvent, deleteEvent }