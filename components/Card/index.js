import React from 'react'

import { useSelector, useDispatch } from "react-redux";


const cardStyle = {
    color: '#f5f5f5',
    backgroundColor: 'rgba(19,85,124,0.6)',
    fontSize: 17,
    padding: 20,
    border: "1px solid red",
    margin: 10,
    fontFamily: 'Ubuntu',
    borderRadius: 8,
}

export const Card = ({ movie }) => {

    const dispatch = useDispatch()

    return (

        <div style={cardStyle} className="card-wrapper" onClick={() => dispatch({ type: "ADD_FAVORITES", payload: movie.title })}>
            <div style={{flex:1, color:'#bf360c', fontSize: 25, fontFamily: "Goldman"}}>
                <p>{movie.title}</p>
            </div>
            <div style={{flex:1, lineHeight: 1.5,}}>
                <p>{movie.overview}</p>
            </div>
            <div style={{flex:1, color:'#bf360c'}}>
                <p>{movie.vote_average}</p>
            </div>
            <div style={{flex:1}}>
                <img src={"https://image.tmdb.org/t/p/w1280/" + movie.poster_path} style={{ width: "80%", height: "500px" }} />
            </div>


        </div>
    )
}



