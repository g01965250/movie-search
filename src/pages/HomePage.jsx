import React, { useState } from 'react';
import useFetch from '../useFetch';
import { useNavigate } from 'react-router-dom';
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
    <div>
      <h1>Movie Search</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="搜尋電影..."
      />
      <button onClick={handleSearch}>搜尋</button>
      <button onClick={() => navigate('/favorites')}>❤️ 收藏清單</button>
      <div>
        {data &&
          data.results.map((movie) => (
            <div
              key={movie.id}
              onClick={() => navigate(`/movie/${movie.id}`)}
              style={{ cursor: 'pointer' }}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <h3>{movie.title}</h3>
              <p>評分：{movie.vote_average}</p>
              <p>上映日期：{movie.release_date}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default HomePage;
