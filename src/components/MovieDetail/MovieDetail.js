import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ModalVideo from 'react-modal-video';
import { auth } from '../../firebase/fbconfig';

const apiKey = "2ab876e9698659187d8d9420ef4d232c"
const baseUrl = "https://api.themoviedb.org/3/search/movie";

export const MovieDetail = ({ location: { state } }) => {
    const [isOpen, setOpen] = useState(false)
    const [trackId, setTrackId] = useState("")
    const [flag, setFlag] = useState(false)
    const [sessionId, setSessionId] = useState()
    const [val,setVal] = useState("")
    const [formflag, setFormFlag]= useState(false);
    const [error, setError] = useState(null)
    const fetchData = async () => {

        const { data: { results } } = await axios.get(`https://api.themoviedb.org/3/movie/${state.id}/videos?api_key=2ab876e9698659187d8d9420ef4d232c&language=en-US`)
        setTrackId(results[0].key)

    }

    useEffect(() => {
        fetchData()
    }, [])


    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                setFlag(true)
            } else {
                setFlag(false)
            }
        })
    }, [])

    const rateMovie = async () => {
        setFormFlag(!formflag)
        let { data: { guest_session_id } } = await axios.get("https://api.themoviedb.org/3/authentication/guest_session/new?api_key=2ab876e9698659187d8d9420ef4d232c")
        setSessionId(guest_session_id)
    }

    const handleSubmit= async(e) => {
        e.preventDefault()
        try{
            let res = await axios.post(`https://api.themoviedb.org/3/movie/${state.id}/rating?api_key=2ab876e9698659187d8d9420ef4d232c&guest_session_id=${sessionId}`,{
                "value":val
            })
            setFormFlag(!formflag)
        } catch (error) {
            setError(error)
        }
        
       
    }
    return (
        <div>


            <div style={{ color: "white", display: "flex" }}>
                <div>
                    <p>{state.title}</p>
                    <img src={"https://image.tmdb.org/t/p/w1280/" + state.poster_path} style={{ width: "80%", height: 400 }} />
                    <p>imdb:{state.vote_average}</p>
                </div>
                <div>
                    <p>{state.title}</p>
                    <p>{state.overview}</p>
                    <p>{state.release_date}</p>
                    <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId={trackId} onClose={() => setOpen(false)} />
                    <button className="btn-primary" onClick={() => setOpen(true)}>VIEW DEMO</button>
                    <button style={{ display: flag ? "block" : "none" }} onClick={rateMovie}>Rate Movie</button>
                    <form onSubmit={handleSubmit} style={{ display : formflag ? "block":"none"}}>
                        <input type="number" onChange={(e)=> setVal(e.target.value)}/>
                        <button type="submit">send</button>
                    </form>
                <p>{error? "hata":null}</p>
                </div>


            </div>
        </div>
    )
}
