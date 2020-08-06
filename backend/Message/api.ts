const sendMsg = require('./routines').createMessage
const messageAPI = (app) => {
    
    app.post('/api/msg/create', (req, res) => {
        sendMsg(req.body).then(
            (result) => { res.send(result) },
            (err) => { res.send(err) }
        )
    })
    
    // TODO: delete message?
}

module.exports = messageAPI