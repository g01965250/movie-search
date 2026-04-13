import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useFetch from '../useFetch';

function MovieDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, loading, error } = useFetch(
    `https://api.themoviedb.org/3/movie/${id}?language=zh-TW`,
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error:{error}</div>;
  return (
    <div>
      <button onClick={() => navigate(-1)}>返回</button>
      {data && (
        <div>
          <img
            src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
            alt={data.title}
          />
          <h1>{data.title}</h1>
          <p>{data.overview}</p>
          <p>評分：{data.vote_average}</p>
          <p>上映日期：{data.release_date}</p>
          <p>片長：{data.runtime} 分鐘</p>
        </div>
      )}
    </div>
  );
}

export default MovieDetailPage;
