import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

// in props: password as unencrypted string
function Auth(props: any) {
    const [password, setPassword] = useState('')
    const [backRequest, setBackRequest] = useState(false)

    const sendPassword = () => {
        if (password) {
            props.callback(password)
        }
    }

    // arghdhjfdf similar functions.................. refactor later.....
    const handleInputByEnter = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            const target = e.target as HTMLInputElement;
            setPassword(target.value)
        }
    }

    const handleInput = (e: any) => {
        const target = e.target as HTMLInputElement
        setPassword(target.value)
    }

    const goBack = () => {
        setBackRequest(true)
    }

    if (backRequest) {
        return (<Redirect to='/' />)
    }
    
    return (
        <div className='Auth'>
            <p>This room is password-protected</p>
            <input type='text' 
                id='pw_input' 
                placeholder='Enter password' 
                value={password} 
                onChange={handleInput}
                onKeyDown={handleInputByEnter}/>
            <button onClick={sendPassword}>Submit</button>
            <button onClick={goBack}>Home</button>
        </div>
    )
}

export default Auth;