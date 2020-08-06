import React from 'react'

interface MessageProps {
    author: string,
    time: string,
    body: string
}

function Message(props: MessageProps) {
    return (
        <div className="Message">
            <div className="Message__head">
                <h1>{props.author}</h1>
                <p>{props.time}</p> 
            </div>
            <p className="Message_body">
                {props.body}
            </p>

        </div>
    )
}

export default Message;
