import React,{useState, useEffect } from 'react'
import {auth} from "../../firebase/fbconfig"
import { useHistory } from "react-router-dom"

export const Login = () => {
    const history = useHistory()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)

    const handleSubmit = (e) => {
        e.preventDefault()
        auth.signInWithEmailAndPassword(email,password).then(u=> history.push("/")).catch(e => setError(e))
        
    } 

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="email" onChange={(e)=> setEmail(e.target.value)}/>
                <input type="password" placeholder="password" onChange={(e)=> setPassword(e.target.value)}/>
                <button type="submit">Submit</button>
                <p style={{color:'red'}}>{error ? error.message: null}</p>
            </form>
        </div>
    )
}
