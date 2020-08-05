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


module.exports = {
    getAllMessages
}