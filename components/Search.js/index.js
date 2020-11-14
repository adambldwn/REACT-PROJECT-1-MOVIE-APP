import React, { useState } from 'react'

export const Search = ({onSearch}) => {
  
    // console.log(value)
    return (
        <div>
            <input type="text" onChange={(event)=>onSearch(event.target.value)} placeholder="Enter movie name.." style={{padding:10, borderRadius:7}}/>
        </div>
    )
}
