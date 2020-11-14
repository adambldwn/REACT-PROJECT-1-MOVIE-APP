import React, { useEffect, useState } from 'react'
import { Card } from '../Card';
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import { Search } from '../Search.js';
import { StyledMoviesWrapper } from './CardList.style';

const apiKey = "2ab876e9698659187d8d9420ef4d232c"; //temporary
const baseUrl = "https://api.themoviedb.org/3/search/movie";

export const CardList = () => {

    const data = useSelector(state => state)

    const [searchedValue, setSearchedValue] = useState("Star Wars")
    const dispatch = useDispatch()


    const [movieList, setMovieList] = useState("")

    const fetchMovies = (pageNum = 1) => {
        axios.get(baseUrl, {
            params: {
                api_key: apiKey,
                page: pageNum,
                query: searchedValue//TODO: from input
            }
        }).then(({ data: { results } }) => setMovieList(results))


    }

    useEffect(() => {
        fetchMovies()
    }, [searchedValue])
    // console.log(searchedValue)
    // console.log(movieList)
    return (
        <div>
            <div style={{ display: "flex", justifyContent: 'space-between', backgroundColor: 'rgba(30,30,30,0.7)', color:'white', padding: 10, alignItems:'center' }}>
                <button style={{padding: 10, backgroundColor:'#d32f2f',borderRadius: 7, border:'none'}}>
                    <Link to="/favorites" style={{textDecoration:'none',fontSize:20, color:'white'}}>Go to Favorites</Link>
                </button>
                <div>
                    <ReactPaginate
                        pageCount={Math.ceil(movieList.length / 3)}
                        pageRangeDisplayed={2}
                        marginPagesDisplayed={1}
                        onPageChange={(data) => fetchMovies(data.selected + 1)}
                        containerClassName="pagination"
                    />
                </div>
                <Search onSearch={val => setSearchedValue(val)} />

            </div>

            <StyledMoviesWrapper>
                {
                    movieList && movieList.map((movie, index) => {
                        return (
                            <Card movie={movie} key={index} />
                        )
                    })
                }
            </StyledMoviesWrapper>
            <div>
                <ReactPaginate
                    pageCount={Math.ceil(movieList.length / 3)}
                    pageRangeDisplayed={2}
                    marginPagesDisplayed={1}
                    onPageChange={(data) => fetchMovies(data.selected + 1)}
                    containerClassName="pagination"
                />
            </div>

        </div>
    )
}
