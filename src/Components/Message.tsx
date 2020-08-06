import React from 'react'

interface MessageProps {
    author: string,
    time: string,
    body: string
}

function formatDate(date:string): string {
    let then = new Date(date)
    let curr = Date.now() - then.getTime()
    // @ts-ignore
    let options = new Intl.DateTimeFormat('en', {timeStyle:'short'})
    // if the message's timestamp is more than half a day old, timestamp is in form DD-MM-YYYY, HH:MM
    if (curr > 1000*60*60*12)
        options = new Intl.DateTimeFormat('en-GB')
    
    // else just display the time
    return options.format(then)
}

function Message(props: MessageProps) {
    return (
        <div className="Message">
            <div className="Message__head">
                <h1>{props.author}</h1>
                <p>{formatDate(props.time)}</p> 
            </div>
            <p className="Message_body">
                {props.body}
            </p>

        </div>
    )
}

export default Message;
