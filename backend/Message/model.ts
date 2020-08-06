//@ts-ignore
const mongoose = require('mongoose')

const msgSchema = new mongoose.Schema({
    room_slug: String,
    author: {
        type: String,
        required: [true, 'No message author given']
    },
    timestamp: {
        type: Date,
        default: new Date(),
        required: [true, 'Messages must have a timestamp']
    },
    body: {
        type: String,
        required: [true, 'Message must have a body']
    }
}, {collection: 'Message'});

module.exports = mongoose.model('Message', msgSchema)