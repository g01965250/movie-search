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
    </div>
  );
};

export default FavoritePage;
