import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { StyledCardWrapper, StyledImgWrapper, StyledFooterWrapper, StyledTitleWrapper} from './Card.style';
import defaultImg from "../../default.jpg"
import {auth, db} from '../../firebase/fbconfig'

const styleAddButton={
    color: "white",
    backgroundColor: "rgba(19,85,124,0.8)",
    borderColor: "rgb(145, 86, 168)",
    padding: "3px",
    borderRadius: "5px",
    borderWidth: "3px ",
    
}


const favArray = []
export const Card = ({ movie }) => {
    
    const [flag, setFlag] = useState(false)
    
    const fav = {
        title:movie.title,
        path: movie.poster_path
    }

    const addFirestore= () => {
        
        if(favArray.indexOf(movie.title) < 0 ){
            console.log(favArray)
            favArray.push(movie.title)
            db.collection("favoriteMovies").add(fav)
        }

    }

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                setFlag(true)
            } else {
                setFlag(false)
            }
        })
    }, [])

    const divEl = flag ? (<button style={styleAddButton} onClick={addFirestore}>Add To Fav</button>) : null;

    const imgUrl = "https://image.tmdb.org/t/p/w1280/" + movie.poster_path

    return (

        <StyledCardWrapper>
           
            <StyledTitleWrapper>{movie.title}</StyledTitleWrapper>
            <StyledImgWrapper src={movie.poster_path ? imgUrl:defaultImg}/>
                <StyledFooterWrapper>
                    {
                        divEl
                    }
                    <Link to={{
                        pathname: `/movie/${movie.title}`,
                        state: { ...movie }
                    }}>
                        <button type="">Go To Detail {">>>"}</button>
                    </Link>
                
                </StyledFooterWrapper>
        </StyledCardWrapper>
    )
}


