import axios from 'axios';
import React, { useState } from 'react';
import '../css/search.scss';
import ContentModal from './ContentModal';
import MainModal from './MainModal';

const Search = () => {

    const [searchText, setSearchText] = useState("");
    const [content, setContent] = useState();
    const [pages, setPages] = useState();
    const [movieFound, setMovieFound] = useState(true);
    let filteredMovies = [];

    const fetchMovie = async () => {
        setContent(null);
        const { data } = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchText}&page=1&include_adult=false`)
        setPages(data.total_pages);
        data.results.length === 0 ? setMovieFound(false) : setMovieFound(true);
        if (searchText.length > 3) {
            setContent(data.results[0]);
        } else {
            let currentPage = 1;
            while (currentPage <= pages && currentPage < 5) {
                const { data } = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchText}&page=${currentPage}&include_adult=false`)
                const movies = data.results.filter(movie => {
                    return (movie.original_title.substring(0, searchText.length).toUpperCase() === searchText.toUpperCase());
                })
                filteredMovies = filteredMovies.concat(movies);
                currentPage++;
            }
            console.log(filteredMovies.length);
            const index = Math.floor(Math.random() * filteredMovies.length);
            setContent(filteredMovies[index]);
        }
    };

    return (
        <>
            <div className="top-container">
                <div className="search__container">
                    <input className="search__input"
                        type="text"
                        placeholder="Type..."
                        onChange={(e) => {
                            setSearchText(e.target.value);
                        }
                        }
                    />
                </div>
                <span onClick={fetchMovie}>
                    <MainModal >
                        {content && <ContentModal content={content} />}
                        {!movieFound && <h1 className='noMovie'>No Movie Available By That Name!</h1>}
                    </MainModal>
                </span>
            </div>
        </>
    )
}

export default Search