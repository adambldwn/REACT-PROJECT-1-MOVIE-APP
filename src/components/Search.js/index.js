import React, { useRef } from 'react'

import { StyledSearchInput,StyledSearchbarWrapper } from './SearchBox.style'
import Searchpng from '../../img/google.png'

export const Search = ({onSearch}) => {
    const inputRef=useRef()
    
    return (
        <StyledSearchbarWrapper >
            <img src={Searchpng} style={{color:"red", height: 30}}/>
            <StyledSearchInput type="text" onChange={(event)=>onSearch(event.target.value)} placeholder="enter movie name.."  ref={inputRef}/>
        </StyledSearchbarWrapper>
    )
}
