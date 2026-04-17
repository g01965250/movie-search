import React, { useState } from 'react';
import useFetch from '../useFetch';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  const [query, setQuery] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const url = searchTerm
    ? `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&language=zh-TW`
    : `https://api.themoviedb.org/3/movie/popular?language=zh-TW&page=1`;

  const { data, loading, error } = useFetch(url);

  const handleSearch = () => {
    setSearchTerm(query);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error:{error}</div>;
  console.log(data);

  return (
    <div className="home-container">
      <div className="home-header">
        <h1 className="home-title">Movie Search</h1>
        <div className="search-wrapper">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜尋電影..."
            className="search-input"
          />
          <button onClick={handleSearch} className="search-btn">
            搜尋
          </button>
          <button
            onClick={() => navigate('/favorites')}
            className="favorites-btn"
          >
            ❤️ 收藏清單
          </button>
        </div>
      </div>
      <div className="movie-grid">
        {data &&
          data.results.map((movie) => (
            <div
              key={movie.id}
              onClick={() => navigate(`/movie/${movie.id}`)}
              className="movie-card"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <div className="movie-info">
                <h3 className="movie-card-title">{movie.title}</h3>
                <p className="movie-card-rating">評分：{movie.vote_average}</p>
                <p className="movie-card-date">
                  上映日期：{movie.release_date}
                </p>
              </div>
            </div>
          ))}
      </div>
      <footer className="footer">
        <p>
          This product uses the TMDB API but is not endorsed or certified by
          TMDB.
        </p>
        <a href="https://www.themoviedb.org/" target="_blank" rel="noreferrer">
          <img
            src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
            alt="TMDB"
          />
        </a>
      </footer>
    </div>
  );
}

export default HomePage;
