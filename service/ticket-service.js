const config = require('../config.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../_helpers/db');
const { get } = require('mongoose');
const Ticket = db.Ticket;

module.exports = {
    createTicket,
    getAllTickets,
    getTicket,
    closeTicket,
    deleteTicket
};

async function createTicket(data) {
    const Ticket = new Ticket(data)
    await Ticket.save()
}

async function getAllTickets(query) {
    return await Ticket.find(query)
}

async function getTicket(param, query_param) {
    if(param.param === 'all') {
        return await Ticket.find();
    } 
    else {
        return await Ticket.find(query_param)
    }
}

async function closeTicket(query) {
    const ticket = await Ticket.findById(query);
    if(ticket.priority != 'high') {
        ticket.status = 'close'
        await ticket.save();
    }
}

async function deleteTicket(query) {
    await Ticket.findByIdAndRemove(query);
}