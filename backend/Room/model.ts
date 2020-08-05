import mongoose = require('mongoose')

// default room without an expiry date set is deleted in 2 days
const roomSchema = new mongoose.Schema({
    room_slug: {
        type: String,
        required: [true, 'No name given'],
        unique: true
    },
    created: {
        type: Date,
        default: new Date(),
        required: [true, 'Creation date needed']
    },
    password: String,
    expires: {
        type: Date,
        default: new Date(new Date().getTime() + (2*24*60*60*1000)) // expires in 2 days (2* 24hrs * 60 min * 60 s * 1000ms)
    }
}, {collection: 'Room'})

module.exports = mongoose.model('Room', roomSchema);