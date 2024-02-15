import React, { useState } from "react";

export default function Home() {
  const [title, setTitle] = useState("");
  const [movie, setMovie] = useState<{ [key: string]: any }>({});

  async function getData() {
    const res = await fetch(
      `http://www.omdbapi.com/?t=${title.replace(/\s+/g, "+")}&apikey=8af4c0d7`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    setMovie(await res.json());
  }

  return (
    <div>
      <div className="header">
        <h1 className="title">Movie Search</h1>
        <div className="search-bar">
          <label>
            Title:
            <input
              onChange={(e) => setTitle(e.target.value)}
              onKeyUp={(event) => {
                if (event.key === "Enter") {
                  getData();
                }
              }}
            />
          </label>
          <button onClick={() => getData()}>Search</button>
        </div>
      </div>
      {movie.Response === "False" ? (
        <h1>Movie not found</h1>
      ) : (
        Object.keys(movie).length > 0 && (
          <div>
            <img alt="Picture of the author" src={movie.Poster} />
            <h1>
              {movie.Title} ({movie.Year})
            </h1>
            <p>By {movie.Director}</p>
            <p>Starring {movie.Actors}</p>
            <p>{movie.Plot}</p>
            <p>{movie.Awards}</p>
            <p> rating: {movie.imdbRating}/10</p>
          </div>
        )
      )}
    </div>
  );
}
