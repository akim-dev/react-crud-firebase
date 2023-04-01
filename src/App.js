import { useEffect, useState } from "react";
import { Auth } from "./components/Auth";
import { db, auth, storage } from "./config/firebase-config";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import { ref, uploadBytes } from "firebase/storage";

function App() {
  const [movieList, setMovieList] = useState([]);

  // new movies state

  const [newMovieTitle, setnewMovieTitle] = useState("");
  const [newreleaseDate, setnewReleaseDate] = useState(0);
  const [isOscar, setIsOscar] = useState(false);

  const moviesCollectionRef = collection(db, "movies");

  // update judul film
  const [updatedTitle, setUpdatedTitle] = useState("");

  // file upload
  const [fileUpload, setFileUpload] = useState(null);

  // funtion untuk ambil film
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

      // const filteredData = data.docs.map((doc) => ({
      //   return: {
      //     ...doc.data(),
      //     id: doc.id,
      //   },
      // }));

      // console.log(filteredData);
      setMovieList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getMovieList();
  }, []);

  // submit film

  const onSubmitMovie = async () => {
    try {
      await addDoc(moviesCollectionRef, {
        title: newMovieTitle,
        releaseDate: newreleaseDate,
        isOscar: isOscar,
        userId: auth?.currentUser?.uid,
      });
      getMovieList();
    } catch (err) {
      console.error(err);
    }
  };

  // delete film
  const deleteMovie = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await deleteDoc(movieDoc);
    // console.log(movieDoc);
    // console.log(id);
    getMovieList();
  };

  // update judul
  const updateJudul = async (id) => {
    const movieDocUpdate = doc(db, "movies", id);
    await updateDoc(movieDocUpdate, {
      title: updatedTitle,
    });
    getMovieList();
  };

  // Upload file
  const uploadFile = async () => {
    if (!fileUpload) return;
    const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
    try {
      await uploadBytes(filesFolderRef, fileUpload);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Auth />

      <div>
        <input
          placeholder="Judul film..."
          onChange={(e) => setnewMovieTitle(e.target.value)}
        />
        <input
          type="Number "
          onChange={(e) => setnewReleaseDate(Number(e.target.value))}
        />
        <input
          type="checkbox"
          checked={isOscar}
          onChange={(e) => {
            setIsOscar(e.target.checked);
          }}
        />
        <label>Penerima Oscar</label>
        <button onClick={onSubmitMovie}>Submit Film</button>
      </div>

      <div>
        {movieList.map((movie) => (
          <div>
            <h2 style={{ color: movie.receivedanOscar ? "blue" : "red" }}>
              {movie.title}
            </h2>
            <p>{movie.releaseDate}</p>
            <button onClick={() => deleteMovie(movie.id)}>Hapus film</button>
            <input
              placeholder="judul baru ...."
              onChange={(e) => setUpdatedTitle(e.target.value)}
            />
            <button onClick={() => updateJudul(movie.id)}>Update</button>
          </div>
        ))}
      </div>
      <div>
        <input type="file" onChange={(e) => setFileUpload(e.target.files[0])} />
        <button onClick={uploadFile}>Upload file</button>
      </div>
    </div>
  );
}

export default App;
