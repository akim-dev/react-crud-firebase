import { useEffect, useState } from "react";
import { Auth } from "./components/Auth";
import { db } from "./config/firebase-config";
import { getDocs, collection } from "firebase/firestore";

function App() {
  const [movieList, setMovieList] = useState([]);

  // new movies state

  const [newMovieTitle, setnewMovieTitle] = useState("");
  const [releaseDate, setReleaseDate] = useState(0);
  const [isOscar, setIsOscar] = useState(true);

  const moviesCollectionRef = collection(db, "movies");

  useEffect(() => {
    const getMovieList = async () => {
      // read data
      // set movie list
      try {
        const data = await getDocs(moviesCollectionRef);
        // console.log(data);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        console.log(filteredData);
        setMovieList(filteredData);
      } catch (err) {
        console.error(err);
      }
    };
    getMovieList();
  }, []);
  return (
    <div>
      <Auth />

      <div>
        <input
          placeholder="Judul film..."
          onChange={(e) => setnewMovieTitle(e.target.value)}
        />
        <input
          type="number "
          onChange={(e) => setReleaseDate(Number(e.target.value))}
        />
        <input
          type="checkbox"
          checked={isOscar}
          onChange={(e) => {
            isOscar(e.target.checked);
          }}
        />
        <label>Penerima Oscar</label>
        <button>Submit Film</button>
      </div>

      <div>
        {movieList.map((movie) => {
          return (
            <div>
              <h2 style={{ color: movie.receivedanOscar ? "blue" : "red" }}>
                {movie.title}
              </h2>
              <h2>{movie.releaseDate}</h2>
              {/* <h2>{movie.receivedanOscar}</h2> */}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
