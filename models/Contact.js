const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    lastName: { type: String, required: true },
    firstName: { type: String, required: true },
    patronymicName: { type: String, required: true },
    email: { type: String, required: true }
});

module.exports = mongoose.model('Contact', contactSchema);
