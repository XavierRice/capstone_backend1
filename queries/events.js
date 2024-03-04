const db = require('../db/dbConfig')

const getEvents = async () => {
    try {
       const events = await db.any("SELECT * FROM events")
       return events
    } catch (err) {
        return err
    }
}



const getEvent = async (eventId, userId) => {
    try {
       const event = await db.one("SELECT * FROM events WHERE event_id=$1 AND user_id=$2", eventId, userId);
       return event;
    } catch (err) {
        return err;
    }
}




const createEvent = async (event) => {
    try {
        const {  
                user_id,
                event_title,
                event_date,
                event_time,
                lat,
                lng,
                event_location,
                event_details,
                event_photo,
                is_virtual,
                donation_id,
                mobilize_id,
                rsvp
                } = event
        const rsvpValue = rsvp !== undefined ? rsvp : false
        const newEvent = await db.one("INSERT INTO events (user_id, event_title, event_date, event_time, lat, lng, event_location, event_details, event_photo, is_virtual, donation_id, mobilize_id, rsvp) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *", [user_id, event_title, event_date, event_time, lat, lng, event_location, event_details, event_photo, is_virtual, donation_id, mobilize_id, rsvpValue])
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
                event_location,
                event_details,
                event_photo,
                is_virtual,
                donation_id,
                mobilize_id
                } = event
        const updatedEvent = await db.one("UPDATE events SET user_id=$1, event_title=$2, event_date=$3, event_time=$4, lat=$5, lng=$6, event_location=$7, event_details=$8, event_photo=$9, is_virtual=$10, donation_id=$11, mobilize_id=$12 RETURNING *", [user_id, event_title, event_date, event_time, lat, lng, event_location, event_details, event_photo, is_virtual, donation_id, mobilize_id, id])
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


module.exports = { getEvents, getEvent, createEvent, updateEvent, deleteEvent }