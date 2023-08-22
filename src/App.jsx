import { useState, useEffect } from 'react';
import './App.css';
import MovieCard from './MovieCard';
import SearchIcon from './assets/search.svg';

const API_URL = 'https://www.omdbapi.com/?apikey=9b59d2b3';

const App = () => {
  const [searchText, setSearchText] = useState('');
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const searchMovies = async (title) => {
    const response = await axios.get(`${API_URL}&s=${title}`);
    const data = await response.data;
    const value = await data.Search;
    setMovies(value);
    setIsLoading(false);
  };

  useEffect(() => {
    searchMovies('avengers');
  }, []);

  return (
    <div className="app">
      <h1>MoviesDekho</h1>

      <div className="search">
        <input
          type="text"
          placeholder="Search Movies ..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchText)}
        />
      </div>

      {isLoading ? (
        <div className="empty">
          <h2>Loading ...</h2>
        </div>
      ) : movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => {
            return <MovieCard {...movie} key={movie.imdbID} />;
          })}
        </div>
      ) : (
        <div className="empty">
          <h2>No Movies Found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
