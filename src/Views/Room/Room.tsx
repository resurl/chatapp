import React, { useState, useEffect } from 'react';
import Message from './Message';
import Auth from './Auth';
import Standin from './Standin'
import { Redirect } from 'react-router-dom';
import { postMessage, getRoom } from '../api';
import { encrypt } from '../encryption';

interface Message {
    author: string,
    timestamp: string,
    body: string
}

const config = {
    nameKey: 'user'
}



function Room(props: any) {
    const [msgs, setMsgs] = useState([] as JSX.Element[])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [name, setName] = useState('undefined')
    const [authenticated, setAuthenticated] = useState(true)
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [hasUsername, setHasUser] = useState(false)

    // on mount, get room. when it's done, set loaded to true
    useEffect(()=> {
        let unmounted = false

        let name = sessionStorage.getItem(config.nameKey)
        if (name && !unmounted) {
            console.log(name)
            setUsername(name)
            setHasUser(true)
        }

        setLoading(true)
        getRoom(props.location.pathname)
        .then((data: any) => {
            // set room properties according to fetched data
            let state = data.data
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
                setLoading(false);
            }
        })

        return () => { unmounted = true }
    }, [])

    useEffect(() => {
        // this should only fire upon mount
        if (password !== '')
            setAuthenticated(false)
    },[password])

    const createMessageLog = (msgs: Message[]) : JSX.Element[] => {
        return msgs.map((msg: Message, idx:number)=> 
            <Message author={msg.author} 
                time={msg.timestamp} 
                body={msg.body} 
                isUser={msg.author == username}
                key={idx} />)
    }

    const getUsername = () => {
        return (
            <div className='Room__display'>
                <input type='text' 
                    placeholder='Enter a username' 
                    onChange={usernameInput} 
                    onKeyDown={confirmUsername} />
            </div>
        );
    }

    const usernameInput = (e: React.ChangeEvent) => {
        const target = e.target as HTMLTextAreaElement
        setUsername(target.value)
    }

    const confirmUsername = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            setHasUser(true)
            sessionStorage.setItem(config.nameKey, username)
        }
    }

    const sendMessage = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const target = e.target as HTMLTextAreaElement
        if (e.key === 'Enter' && target.value !== '') {
            
            let newMessage = {
                room_slug: name,
                author: username,
                timestamp: new Date(),
                body: target.value
            }
            
            let newMsgJSX = <Message author={newMessage.author} 
                time={newMessage.timestamp.toString()} 
                body={newMessage.body} 
                isUser={true}
                key={msgs.length+1} />;
            
            // post message to db
            postMessage(newMessage)
            
            // render new message to chat logs
            setMsgs([...msgs, newMsgJSX]);
            target.value = ''
        }
    }

    const checkPassword = (value: string) => {
        let salt = password.charAt(0) + password.slice(11)
        let encryptedInput = encrypt(value,salt)
        if (encryptedInput===password && !authenticated) {
            setAuthenticated(true)
        } else {
            // TODO: need createRoom to work in order to test password check
            console.log('too bad so sad :))))')
        }
    }

    // TODO: create Loading Messages stand-in
    return (
        <div className='Room'>
            <h1>{name}</h1>

            <div className='Room__display'>
                {
                loading ? 
                    <p>Loading...</p> : 
                    (authenticated ? 
                        (username==='' || !hasUsername ? 
                            getUsername() :
                            <section >{msgs}</section>):
                        <Auth pw={password} callback={checkPassword}/>)
                }
            </div>

            <div className='Room__input'>
                <input type='text' placeholder='Start typing...' onKeyDown={sendMessage} autoFocus={true} />
            </div>
            {error && <Redirect to='/' />}
        </div>);
}

export default Room;