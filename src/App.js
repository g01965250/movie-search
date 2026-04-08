import React from 'react';
import useFetch from './useFetch';
function App() {
  const { data, loading, error } = useFetch(
    'https://api.themoviedb.org/3/movie/popular?language=zh-TW&page=1',
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error:{error}</div>;
  console.log(data);

  return (
    <div>
      <h1>Movie Search</h1>
      <div>
        {data &&
          data.results.map((movie) => (
            <div key={movie.id}>
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

export default App;
