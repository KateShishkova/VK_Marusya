import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useFetchProfileQuery } from "@api/authApi";
import { Layout } from "@components/Layout/Layout";
import { MainPage } from "@pages/MainPage";
import { GenresPage } from "@pages/GenresPage";
import { GenreMoviesPage } from "@pages/GenreMoviesPage";
import { FavoriteMoviesPage } from "@pages/FavoriteMoviesPage";

function App() {
  useFetchProfileQuery();

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/genres" element={<GenresPage />} />
          <Route path="/genres/:genreEn" element={<GenreMoviesPage />} />
          <Route path="/favorites" element={<FavoriteMoviesPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
