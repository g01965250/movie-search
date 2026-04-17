import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useFetch from '../useFetch';
import './MovieDetailPage.css';

function MovieDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [favorited, setFavorited] = useState(false);

  const { data, loading, error } = useFetch(
    `https://api.themoviedb.org/3/movie/${id}?language=zh-TW`,
  );

  useEffect(() => {
    if (data) {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      setFavorited(favorites.some((movie) => movie.id === data?.id));
    }
  }, [data]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (favorited) {
      const newFavorites = favorites.filter((movie) => movie.id !== data.id);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
    } else {
      favorites.push({
        id: data.id,
        title: data.title,
        poster_path: data.poster_path,
      });
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
    setFavorited(!favorited);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error:{error}</div>;
  return (
    <div className="detail-container">
      <button className="back-btn" onClick={() => navigate(-1)}>
        返回
      </button>
      {data && (
        <div className="detail-content">
          <div className="detail-poster">
            <img
              src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
              alt={data.title}
            />
          </div>
          <div className="detail-info">
            <h1 className="detail-title">{data.title}</h1>
            <div className="detail-meta">
              <p>評分：{data.vote_average}</p>
              <p>上映日期：{data.release_date}</p>
              <p>片長：{data.runtime} 分鐘</p>
            </div>
            <p className="detail-overview">{data.overview}</p>
            <button
              className={`favorite-btn ${favorited ? 'favorited' : ''}`}
              onClick={toggleFavorite}
            >
              {favorited ? '❤️ 已收藏' : '🤍 加入收藏'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieDetailPage;
