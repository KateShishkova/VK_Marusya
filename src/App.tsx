import { lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { useFetchProfileQuery } from "@api/authApi";
import { ProtectedRoute } from "@components/Auth/ProtectedRoute";
import { Layout } from "@components/Layout/Layout";
import { PATHS } from "@config/paths";
import { NotFoundPage } from "@pages/NotFoundPage";

const MainPage = lazy(() => import("@pages/MainPage"));
const GenresPage = lazy(() => import("@pages/GenresPage"));
const GenreMoviesPage = lazy(() => import("@pages/GenreMoviesPage"));
const MovieInfoPage = lazy(() => import("@pages/MovieInfoPage"));
const ProfileLayout = lazy(() => import("@pages/ProfilePage/ProfileLayout"));
const ProfileFavoritesPage = lazy(
  () => import("@pages/ProfilePage/ProfileFavoritesPage"),
);
const ProfileSettingsPage = lazy(
  () => import("@pages/ProfilePage/ProfileSettingsPage"),
);

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

          <Route element={<ProtectedRoute />}>
            <Route path={PATHS.PROFILE.ROOT} element={<ProfileLayout />}>
              <Route
                index
                element={
                  <Navigate to={PATHS.PROFILE.SEGMENTS.FAVORITES} replace />
                }
              />
              <Route
                path={PATHS.PROFILE.SEGMENTS.FAVORITES}
                element={<ProfileFavoritesPage />}
              />
              <Route
                path={PATHS.PROFILE.SEGMENTS.SETTINGS}
                element={<ProfileSettingsPage />}
              />
            </Route>
          </Route>

          <Route path={PATHS.NOT_FOUND} element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to={PATHS.NOT_FOUND} replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
