import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useFetchProfileQuery } from "@api/authApi";
import { Layout } from "@components/Layout/Layout";
import { MainPage } from "@pages/MainPage";
import { GenresPage } from "@pages/GenresPage";
import { GenreMoviesPage } from "@pages/GenreMoviesPage";
import { ProfileFavoritesPage } from "@pages/ProfilePage/ProfileFavoritesPage";

import { PATHS } from "@config/paths";
import { MovieInfoPage } from "@pages/MovieInfoPage";
import { NotFoundPage } from "@pages/NotFoundPage";

function App() {
  useFetchProfileQuery();

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path={PATHS.HOME} element={<MainPage />} />
          <Route path={PATHS.GENRES.ROOT} element={<GenresPage />} />
          <Route path={PATHS.GENRES.BY_GENRE} element={<GenreMoviesPage />} />
          <Route
            path={PATHS.MOVIES.ROOT}
            element={<Navigate to={PATHS.HOME} replace />}
          />
          <Route path={PATHS.MOVIES.BY_ID} element={<MovieInfoPage />} />
          <Route
            path={PATHS.PROFILE.FAVORITES}
            element={<ProfileFavoritesPage />}
          />

          <Route path={PATHS.NOT_FOUND} element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to={PATHS.NOT_FOUND} replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
