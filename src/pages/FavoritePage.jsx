import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div>
      <button onClick={() => navigate(-1)}>返回</button>
      <h1>收藏清單</h1>
      {favorites === 0 && <p>還沒有收藏清單</p>}
      <div>
        {favorites.map((movie) => (
          <div key={movie.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              onClick={() => navigate(`/movie/${movie.id}`)}
              style={{ cursor: 'pointer' }}
            />
            <h3>{movie.title}</h3>
            <button onClick={() => removeFavorite(movie.id)}>移除收藏</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritePage;
