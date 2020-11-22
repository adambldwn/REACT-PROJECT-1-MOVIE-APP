import React, { useEffect, useState, createContext ,useReducer} from 'react'
import { CardList } from '../components/CardList/index.js';
import axios from 'axios';

require("dotenv").config()
const apiKey=process.env.REACT_APP_API_KEY


const baseUrl = "https://api.themoviedb.org/3/search/movie";

export const MovieContex = createContext()
 
function App() {
  
  const [searchedValue, setSearchedValue] = useState("Star Wars")
  const [movieList, setMovieList] = useState("")
 

  const fetchMovies = (pageNum = 1) => {
    axios.get(baseUrl, {
      params: {
        api_key: apiKey,
        page: pageNum,
        query: searchedValue
      }
    }).then(({ data: { results } }) => setMovieList(results))

  }

  useEffect(() => {
    fetchMovies()
  }, [searchedValue])


  return (
    <div className="App">
      <MovieContex.Provider value={{ movieList, setSearchedValue, fetchMovies }}>
          <CardList />
      </MovieContex.Provider>

    </div>
  );
}

export default App;
