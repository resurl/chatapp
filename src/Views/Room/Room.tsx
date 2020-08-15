import React, { useState, useEffect } from 'react';
import Message from './Message';
import Auth from './Auth';
import { Redirect } from 'react-router-dom';
import { postMessage, getRoom } from '../api';
import { encrypt } from '../encryption';

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
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [name, setName] = useState('undefined')
    const [authenticated, setAuthenticated] = useState(true)
    const [password, setPassword] = useState('')

    // on mount, get room. when it's done, set loaded to true
    useEffect(()=> {
        let unmounted = false
        setLoading(true)
        getRoom(props.location.pathname)
        .then((data: any) => {
            let state = data.data
            console.log(state)
            if (!unmounted) {
                setMsgs(createMessageLog(state.messages));
                setName(state.room_slug);
                if (state.password) setPassword(state.password);
            }
        })
        .catch( () => {
            if (!unmounted)
                setError(true)
        })
        .finally( () => {
            if (!unmounted) {
                if (password === ('' || undefined)) {
                    setAuthenticated(true)
                }
                setLoading(false);
            }
        })
        
        return () => { unmounted = true }
    }, [])

    useEffect(() => {
        setAuthenticated(false)
    },[password])

    const sendMessage = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const target = e.target as HTMLTextAreaElement
        if (e.key === 'Enter' && target.value !== '') {
            
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
            target.value = ''
        }
    }

    const checkPassword = (value: string) => {
        let salt = password.charAt(0) + password.slice(11)
        let encryptedInput = encrypt(value,salt)
        if (encryptedInput===password) {
            setAuthenticated(true)
        }
    }

    // TODO: create Loading Messages stand-in
    return (
        <div className='Room'>
            <h1>{name}</h1>

            {loading ? 
                <p>Loading...</p> : 
                (authenticated ? 
                    <section className='Room__msgs'>{msgs}</section> :
                    <Auth pw={password} callback={checkPassword}/>)}
            <div className='Room__input'>
                <input type='text' placeholder='Start typing...' onKeyDown={sendMessage} autoFocus={true} />
            </div>
            {error && <Redirect to='/' />}
        </div>);
}

export default Room;