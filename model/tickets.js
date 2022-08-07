const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    title: { type: String },
    description: { type: String },
    status: { type: String, default: "open" },
    priority: { type: String, default: "low" },
    assigned_to: { type: String },
    created_at: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Ticket', schema);