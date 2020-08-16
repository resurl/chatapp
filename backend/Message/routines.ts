const Message = require('./model.ts');

// get all messages in a room 
const getAllMessages = (room_slug: string) => {
    return new Promise((resolve, reject) => {
        Message
        .find({room_slug})
        .sort({timestamp: 1})
        .exec((err, msg)=>{
            if (err) {console.error(err); reject(err);}
            else if (!msg) reject(null);
            else resolve(msg);
        })
    })    
}

/**
 * msg_obj {
 *  author: string
 *  body: string,
 *  room_slug: string
 * }
 */

const createMessage = (msg_obj: any) => {
    msg_obj.time = new Date()
    return new Promise((resolve, reject) => {
        let newMsg = new Message(msg_obj)
        newMsg.save((err) => {
            if (err) { console.error(err) ; reject(err) }
            else { resolve(newMsg) }
        })
    })   
}

module.exports = {
    getAllMessages,
    createMessage
}