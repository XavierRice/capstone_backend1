const express = require('express');
require("dotenv").config()
const events = express.Router()
const { getEvents, 
        createEvent,
        updateEvent,
        deleteEvent } = require('../queries/events')





events.get('/', async (req, res) => {
    try {
        const events = await getEvents()
        res.status(200).json({ data: events })
    } catch (error) {
            res.status(500).json({ error: "Internal Server Error" })
    }
})
        

// get one event
events.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const event = await getEvents( id )
        res.status(200).json(event)
    } catch (err) {
        res.status(404).json({ error: err })
    }
})

events.post('/', async (req, res) => {
    try {
        const newEvent = await createEvent(req.body)
        res.status(201).json({ data: newEvent })
    } catch (err) {
        res.status(500).json({ error: "Invalid Information", info: err.message })
    }
})

events.put('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const updatedEvent = await updateEvent(id, req.body)
        res.status(200).json(updatedEvent)
    } catch (err) {
        res.status(404).json({ error: err })
    }
})

events.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params
        const deletedEvent = await deleteEvent(id)
        res.status(200).json({ message: "Successfully deleted event" })
    } catch (err) {
        res.status(404).json({ error: err })
    }
})


module.exports = events