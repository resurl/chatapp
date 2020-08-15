import React, { useState, useEffect } from 'react'
import Message from './Message'
import { Redirect } from 'react-router-dom'
import { postMessage, getRoom } from '../api'

interface Message {
    author: string,
    timestamp: string,
    body: string
}

const config = {
    key: '@session'
}

const createMessageLog = (msgs: Message[]) : JSX.Element[] => {
    return msgs.map((msg: Message, idx:number)=> 
        <Message author={msg.author} time={msg.timestamp} body={msg.body} key={idx} />)
}

function Room(props: any) {
    const [msgs, setMsgs] = useState([] as JSX.Element[])
    const [newMsgs, setNewMsgs] = useState([] as any[])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [name, setName] = useState('undefined')
    const [authenticated, setAuthenticated] = useState(true)

    // on mount, get room. when it's done, set loaded to true
    useEffect(()=> {
        let unmounted = false

        setLoading(true)
        getRoom(props.location.pathname)
        .then((data: any) => {
            console.log(data)
            if (!unmounted) {
                setMsgs(createMessageLog(data.data.messages));
                setName(data.data.room_slug)
            }
        })
        .catch( () => {
            if (!unmounted)
                setError(true)
        })
        .finally( () => {
            // TODO: room password authentication
            if (!unmounted)
                setLoading(false);
        })
        
        return () => { unmounted = true }
    }, [])

    const sendMessage = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const target = e.target as HTMLTextAreaElement
        if (e.key === 'Enter' && target.value != '') {
            let newMessage = {
                room_slug: 'test',
                author: 'testguy',
                timestamp: new Date(),
                body: target.value
            }
            
            let newMsgJSX = <Message author={newMessage.author} time={newMessage.timestamp.toString()} 
                body={newMessage.body} key={msgs.length+1} />;
            
            // post message to db
            postMessage(newMessage)
            
            setMsgs([...msgs, newMsgJSX]);
            setNewMsgs([...newMsgs, newMessage])
            
            target.value = ''
        }
    }

    // TODO: create Loading Messages stand-in
    // TODO: create password screen if room's password field is defined
    return (
        <div className='Room'>
            <h1>{name}</h1>
            {loading ? <p>Loading...</p> : <section className='Room__msgs'>{msgs}</section> }
            <div className='Room__input'>
                <input type='text' placeholder='Start typing...' onKeyDown={sendMessage} autoFocus={true} />
            </div>
            {error && <Redirect to='/' />}
        </div>);
}

export default Room;