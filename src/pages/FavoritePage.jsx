import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FavoritePage.css';

const FavoritePage = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem('favorites') || '[]'),
  );

  const removeFavorite = (id) => {
    const newFavorites = favorites.filter((movie) => movie.id !== id);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    setFavorites(newFavorites);
  };
  return (
    <div className="favorite-container">
      <div className="favorite-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          返回
        </button>
        <h1 className="favorite-title">收藏清單</h1>
      </div>
      {favorites.length === 0 && (
        <p className="empty-message">還沒有收藏清單</p>
      )}
      <div className="favorite-grid">
        {favorites.map((movie) => (
          <div className="favorite-card" key={movie.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              onClick={() => navigate(`/movie/${movie.id}`)}
              style={{ cursor: 'pointer' }}
            />
            <div className="favorite-card-info">
              <p className="favorite-card-title">{movie.title}</p>
              <button
                className="remove-btn"
                onClick={() => removeFavorite(movie.id)}
              >
                移除收藏
              </button>
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
};

export default FavoritePage;
