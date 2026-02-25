const mongoose = require('mongoose');

const EventRegistrationSchema = new mongoose.Schema({
    eventTitle: String,
    studentName: String,
    studentEmail: String,
    semester: String,
    branch: String,
    registrationDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('EventRegistration', EventRegistrationSchema);