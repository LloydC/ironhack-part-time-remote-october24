import { useState, useEffect } from "react";
import service from "../../services/file-upload.service";
 
function HomePage() {
  const [movies, setMovies] = useState([]);
 
  // Run the effect after the initial render to get a list of movies from the server
  useEffect(() => {
    service.getMovies()
      .then((data) => {
        // console.log("data", data);
        setMovies(data);
      })
      .catch((err) => console.log(err));
  }, []); //  <-- This effect will run only once, after the initial render
 
  return (
    <div className="HomePage">
      <h2>Movies</h2>
      {movies &&
        movies.map((movie) => (
          <div key={movie._id}>
            <p>{movie.title}</p>
            <img src={movie.imageUrl} alt="movie" width="200" />
            <p>{movie.description}</p>
          </div>
        ))}
    </div>
  );
}
 
export default HomePage;