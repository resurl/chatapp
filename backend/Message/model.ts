//@ts-ignore
const mongoose = require('mongoose')

const msgSchema = new mongoose.Schema({
    author: {
        type: String,
        required: [true, 'No message author given']
    },
    room_slug: String,
    timestamp: {
        type: Date,
        default: Date.now,
        required: [true, 'Messages must have a timestamp']
    },
    body: {
        type: String,
        required: [true, 'Message must have a body']
    }
});

module.exports = mongoose.model('Message', msgSchema, 'message');