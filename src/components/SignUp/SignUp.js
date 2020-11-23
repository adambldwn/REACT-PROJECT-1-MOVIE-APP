import React, { useState } from 'react'
import { auth } from "../../firebase/fbconfig"
import { useHistory } from "react-router-dom"

export const SignUp = () => {

    const [name, setName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)

    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault()
        auth.createUserWithEmailAndPassword(email, password).then(u=> history.push("/")).catch(e => setError(e)) 
    }

    return (
        <div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', height: 400, width: 300, justifyContent: 'space-around', borderRadius: 15 }}>

                <div>
                    <label for="name">Name</label>
                    <input id="name" type="text" placeholder="name" onChange={(e) => setName(e.target.value)} style={{ display: 'block', padding: 6, marginTop: 7, borderRadius: 7, width: '93%', outline: 'none', border: '1px solid #005cb2' }} />
                </div>
                <div>
                    <label for="lastName">Last name</label>
                    <input id="lastName" type="text" placeholder="lastName" onChange={(e) => setLastName(e.target.value)} style={{ display: 'block', padding: 6, marginTop: 7, borderRadius: 7, width: '93%', outline: 'none', border: '1px solid #005cb2' }} />
                </div>
                <div>
                    <label for="email">Email</label>
                    <input id="email" type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} style={{ display: 'block', padding: 6, marginTop: 7, borderRadius: 7, width: '93%', outline: 'none', border: '1px solid #005cb2' }} />
                </div>

                <div>
                    <label for="password">Password</label>
                    <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} style={{ display: 'block', padding: 6, marginTop: 7, borderRadius: 7, width: '93%', outline: 'none', border: '1px solid #005cb2' }} />
                </div>

                <button className="loginSubmit" type="submit" >Sign Up</button>
                <p style={{ color: 'red', margin: '0 auto' }}>{error ? error.message : null}</p>
            </form>

        </div>
    )
}
