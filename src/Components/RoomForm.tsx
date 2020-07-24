import React, {useState} from 'react'

export default function RoomForm() {
    const [expiry, setExpiry] = useState('')
    const [password, setPassword] = useState('')

    const handlePwChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        setPassword(target.value)
    }

    const handleExpiryChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        setExpiry(target.value)
    }

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(`submit ${password} ${expiry}`);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <input type='text' placeholder='(optional) password' value={password} onChange={handlePwChange}/>
                <input type='text' placeholder='expiry date in days' value={expiry} onChange={handleExpiryChange}/>
            </div>
            <input type='submit' value='Submit' />
        </form>
    )
}
