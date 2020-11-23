import React, { useEffect } from 'react'
import { Link, useHistory } from "react-router-dom"
import { useState } from 'react/cjs/react.development'
import { auth } from "../../firebase/fbconfig"
import logo from '../../img/Logo.png'
import { Search } from '../Search.js'


export const Navbar = (props) => {

    const [flag, setFlag] = useState(false)
    const history = useHistory()

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                setFlag(true)
            } else {
                setFlag(false)
            }
        })
    }, [])

    const divEl = flag ? (
        <div style={{ display: "flex", flexDirection: 'row', gap: 15}}>

            <button style={{ padding: 10, borderRadius: 8, fontSize: 20 }}>
                <Link to="/favorites" style={{ color: "red", textDecoration: "none" }}>Favorites</Link>
            </button>

            <button onClick={() => auth.signOut() } style={{ padding: 10, borderRadius: 8, fontSize: 20}}>Logout </button>
            
        </div>
    ) : (
            <div style={{ display: "flex", flexDirection: 'row', gap: 15}}>
                <button onClick={() => history.push("/login")} style={{ padding: 10, borderRadius: 8, fontSize: 20 }}>Login </button>
                <button onClick={() => history.push("/signup")} style={{ padding: 10, borderRadius: 8, fontSize: 20 }}>SignUp </button>
            </div>
        )

    return (
        <div style={{ display: "flex", backgroundColor: "rgba(30,30,30,0.7)", justifyContent: "space-between", color: "white", padding: 10, alignItems: "center" }}>
            <div style={{ color: "white", borderRadius: 40, height: 80, width: 80, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Link to="/" style={{ color: "white", textDecoration: "none" }}>
                    <img src={logo} style={{ marginLeft: 5.5 }} />
                </Link>
            </div>
            <Search />

            {
                divEl
            }
        </div>
    )
}
