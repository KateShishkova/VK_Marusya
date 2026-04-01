import { useState } from "react";
import { Popup } from "./components/UI/Popup";
import { Button } from "./components/UI/Button";
import { Layout } from "./components/Layout/Layout";
import { GENRES } from "@config/genres";
import { YoutubePlayer } from "@components/Movie/YoutubePlayer";
import { RegisterForm } from "@components/Auth/RegisterForm";
import { AuthForm } from "@components/Auth/AuthForm";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@store/store";
import { authApi, useFetchProfileQuery, useLogoutMutation } from "@api/authApi";
import { resetUser } from "@store/userSlice";
import { MainPage } from "@pages/MainPage";

const movie = {
  id: 1207898,
  title: "Шерлок Холмс и доктор Ватсон: Знакомство",
  originalTitle: "The Jack in the Box Rises",
  language: "Русский",
  releaseYear: 1979,
  releaseDate: "2024-01-18",
  genres: ["детектив"],
  plot: "Увлекательные приключения самого известного сыщика всех времен",
  runtime: 67,
  budget: "250000",
  revenue: "2835000",
  homepage: "",
  status: "released",
  posterUrl:
    "https://cinemaguide.skillbox.cc/images/1207898/uLEL4AxKOn6pZQAF3gWXbqSkhIo.jpg",
  backdropUrl:
    "https://cinemaguide.skillbox.cc/images/1207898/8VS20PnbTc6Aza1ZjCxit9os3KD.jpg",
  trailerUrl: "https://youtube.com/watch?v=1osssQbmSNQ",
  trailerYouTubeId: "1osssQbmSNQ",
  tmdbRating: 7.53,
  searchL: "the jack in the box rises",
  keywords: [],
  countriesOfOrigin: [],
  languages: [],
  cast: [],
  director: "Игорь Масленников",
  production: "Ленфильм",
  awardsSummary: "Топ-250, 33 место",
};

const list = [
  {
    id: 1207898,
    title: "Шерлок Холмс и доктор Ватсон: Знакомство",
    originalTitle: "The Jack in the Box Rises",
    language: "Русский",
    releaseYear: 1979,
    releaseDate: "2024-01-18",
    genres: ["детектив"],
    plot: "Увлекательные приключения самого известного сыщика всех времен",
    runtime: 67,
    budget: "250000",
    revenue: "2835000",
    homepage: "",
    status: "released",
    posterUrl:
      "https://cinemaguide.skillbox.cc/images/1207898/uLEL4AxKOn6pZQAF3gWXbqSkhIo.jpg",
    backdropUrl:
      "https://cinemaguide.skillbox.cc/images/1207898/8VS20PnbTc6Aza1ZjCxit9os3KD.jpg",
    trailerUrl: "https://youtube.com/watch?v=1osssQbmSNQ",
    trailerYouTubeId: "1osssQbmSNQ",
    tmdbRating: 7.53,
    searchL: "the jack in the box rises",
    keywords: [],
    countriesOfOrigin: [],
    languages: [],
    cast: [],
    director: "Игорь Масленников",
    production: "Ленфильм",
    awardsSummary: "Топ-250, 33 место",
  },
  {
    id: 1207899,
    title: "Шерлок Холмс и доктор Ватсон: Знакомство",
    originalTitle: "The Jack in the Box Rises",
    language: "Русский",
    releaseYear: 1979,
    releaseDate: "2024-01-18",
    genres: ["детектив"],
    plot: "Увлекательные приключения самого известного сыщика всех времен",
    runtime: 67,
    budget: "250000",
    revenue: "2835000",
    homepage: "",
    status: "released",
    posterUrl:
      "https://cinemaguide.skillbox.cc/images/1207898/uLEL4AxKOn6pZQAF3gWXbqSkhIo.jpg",
    backdropUrl:
      "https://cinemaguide.skillbox.cc/images/1207898/8VS20PnbTc6Aza1ZjCxit9os3KD.jpg",
    trailerUrl: "https://youtube.com/watch?v=1osssQbmSNQ",
    trailerYouTubeId: "1osssQbmSNQ",
    tmdbRating: 7.53,
    searchL: "the jack in the box rises",
    keywords: [],
    countriesOfOrigin: [],
    languages: [],
    cast: [],
    director: "Игорь Масленников",
    production: "Ленфильм",
    awardsSummary: "Топ-250, 33 место",
  },
  {
    id: 1207898,
    title: "Шерлок Холмс и доктор Ватсон: Знакомство",
    originalTitle: "The Jack in the Box Rises",
    language: "Русский",
    releaseYear: 1979,
    releaseDate: "2024-01-18",
    genres: ["детектив"],
    plot: "Увлекательные приключения самого известного сыщика всех времен",
    runtime: 67,
    budget: "250000",
    revenue: "2835000",
    homepage: "",
    status: "released",
    posterUrl:
      "https://cinemaguide.skillbox.cc/images/1207898/uLEL4AxKOn6pZQAF3gWXbqSkhIo.jpg",
    backdropUrl:
      "https://cinemaguide.skillbox.cc/images/1207898/8VS20PnbTc6Aza1ZjCxit9os3KD.jpg",
    trailerUrl: "https://youtube.com/watch?v=1osssQbmSNQ",
    trailerYouTubeId: "1osssQbmSNQ",
    tmdbRating: 7.53,
    searchL: "the jack in the box rises",
    keywords: [],
    countriesOfOrigin: [],
    languages: [],
    cast: [],
    director: "Игорь Масленников",
    production: "Ленфильм",
    awardsSummary: "Топ-250, 33 место",
  },
  {
    id: 1207898,
    title: "Шерлок Холмс и доктор Ватсон: Знакомство",
    originalTitle: "The Jack in the Box Rises",
    language: "Русский",
    releaseYear: 1979,
    releaseDate: "2024-01-18",
    genres: ["детектив"],
    plot: "Увлекательные приключения самого известного сыщика всех времен",
    runtime: 67,
    budget: "250000",
    revenue: "2835000",
    homepage: "",
    status: "released",
    posterUrl:
      "https://cinemaguide.skillbox.cc/images/1207898/uLEL4AxKOn6pZQAF3gWXbqSkhIo.jpg",
    backdropUrl:
      "https://cinemaguide.skillbox.cc/images/1207898/8VS20PnbTc6Aza1ZjCxit9os3KD.jpg",
    trailerUrl: "https://youtube.com/watch?v=1osssQbmSNQ",
    trailerYouTubeId: "1osssQbmSNQ",
    tmdbRating: 7.53,
    searchL: "the jack in the box rises",
    keywords: [],
    countriesOfOrigin: [],
    languages: [],
    cast: [],
    director: "Игорь Масленников",
    production: "Ленфильм",
    awardsSummary: "Топ-250, 33 место",
  },
  {
    id: 1207898,
    title: "Шерлок Холмс и доктор Ватсон: Знакомство",
    originalTitle: "The Jack in the Box Rises",
    language: "Русский",
    releaseYear: 1979,
    releaseDate: "2024-01-18",
    genres: ["детектив"],
    plot: "Увлекательные приключения самого известного сыщика всех времен",
    runtime: 67,
    budget: "250000",
    revenue: "2835000",
    homepage: "",
    status: "released",
    posterUrl:
      "https://cinemaguide.skillbox.cc/images/1207898/uLEL4AxKOn6pZQAF3gWXbqSkhIo.jpg",
    backdropUrl:
      "https://cinemaguide.skillbox.cc/images/1207898/8VS20PnbTc6Aza1ZjCxit9os3KD.jpg",
    trailerUrl: "https://youtube.com/watch?v=1osssQbmSNQ",
    trailerYouTubeId: "1osssQbmSNQ",
    tmdbRating: 7.53,
    searchL: "the jack in the box rises",
    keywords: [],
    countriesOfOrigin: [],
    languages: [],
    cast: [],
    director: "Игорь Масленников",
    production: "Ленфильм",
    awardsSummary: "Топ-250, 33 место",
  },
  {
    id: 1207898,
    title: "Шерлок Холмс и доктор Ватсон: Знакомство",
    originalTitle: "The Jack in the Box Rises",
    language: "Русский",
    releaseYear: 1979,
    releaseDate: "2024-01-18",
    genres: ["детектив"],
    plot: "Увлекательные приключения самого известного сыщика всех времен",
    runtime: 67,
    budget: "250000",
    revenue: "2835000",
    homepage: "",
    status: "released",
    posterUrl:
      "https://cinemaguide.skillbox.cc/images/1207898/uLEL4AxKOn6pZQAF3gWXbqSkhIo.jpg",
    backdropUrl:
      "https://cinemaguide.skillbox.cc/images/1207898/8VS20PnbTc6Aza1ZjCxit9os3KD.jpg",
    trailerUrl: "https://youtube.com/watch?v=1osssQbmSNQ",
    trailerYouTubeId: "1osssQbmSNQ",
    tmdbRating: 7.53,
    searchL: "the jack in the box rises",
    keywords: [],
    countriesOfOrigin: [],
    languages: [],
    cast: [],
    director: "Игорь Масленников",
    production: "Ленфильм",
    awardsSummary: "Топ-250, 33 место",
  },
  {
    id: 1207898,
    title: "Шерлок Холмс и доктор Ватсон: Знакомство",
    originalTitle: "The Jack in the Box Rises",
    language: "Русский",
    releaseYear: 1979,
    releaseDate: "2024-01-18",
    genres: ["детектив"],
    plot: "Увлекательные приключения самого известного сыщика всех времен",
    runtime: 67,
    budget: "250000",
    revenue: "2835000",
    homepage: "",
    status: "released",
    posterUrl:
      "https://cinemaguide.skillbox.cc/images/1207898/uLEL4AxKOn6pZQAF3gWXbqSkhIo.jpg",
    backdropUrl:
      "https://cinemaguide.skillbox.cc/images/1207898/8VS20PnbTc6Aza1ZjCxit9os3KD.jpg",
    trailerUrl: "https://youtube.com/watch?v=1osssQbmSNQ",
    trailerYouTubeId: "1osssQbmSNQ",
    tmdbRating: 7.53,
    searchL: "the jack in the box rises",
    keywords: [],
    countriesOfOrigin: [],
    languages: [],
    cast: [],
    director: "Игорь Масленников",
    production: "Ленфильм",
    awardsSummary: "Топ-250, 33 место",
  },
  {
    id: 1207898,
    title: "Шерлок Холмс и доктор Ватсон: Знакомство",
    originalTitle: "The Jack in the Box Rises",
    language: "Русский",
    releaseYear: 1979,
    releaseDate: "2024-01-18",
    genres: ["детектив"],
    plot: "Увлекательные приключения самого известного сыщика всех времен",
    runtime: 67,
    budget: "250000",
    revenue: "2835000",
    homepage: "",
    status: "released",
    posterUrl:
      "https://cinemaguide.skillbox.cc/images/1207898/uLEL4AxKOn6pZQAF3gWXbqSkhIo.jpg",
    backdropUrl:
      "https://cinemaguide.skillbox.cc/images/1207898/8VS20PnbTc6Aza1ZjCxit9os3KD.jpg",
    trailerUrl: "https://youtube.com/watch?v=1osssQbmSNQ",
    trailerYouTubeId: "1osssQbmSNQ",
    tmdbRating: 7.53,
    searchL: "the jack in the box rises",
    keywords: [],
    countriesOfOrigin: [],
    languages: [],
    cast: [],
    director: "Игорь Масленников",
    production: "Ленфильм",
    awardsSummary: "Топ-250, 33 место",
  },
  {
    id: 1207898,
    title: "Шерлок Холмс и доктор Ватсон: Знакомство",
    originalTitle: "The Jack in the Box Rises",
    language: "Русский",
    releaseYear: 1979,
    releaseDate: "2024-01-18",
    genres: ["детектив"],
    plot: "Увлекательные приключения самого известного сыщика всех времен",
    runtime: 67,
    budget: "250000",
    revenue: "2835000",
    homepage: "",
    status: "released",
    posterUrl:
      "https://cinemaguide.skillbox.cc/images/1207898/uLEL4AxKOn6pZQAF3gWXbqSkhIo.jpg",
    backdropUrl:
      "https://cinemaguide.skillbox.cc/images/1207898/8VS20PnbTc6Aza1ZjCxit9os3KD.jpg",
    trailerUrl: "https://youtube.com/watch?v=1osssQbmSNQ",
    trailerYouTubeId: "1osssQbmSNQ",
    tmdbRating: 7.53,
    searchL: "the jack in the box rises",
    keywords: [],
    countriesOfOrigin: [],
    languages: [],
    cast: [],
    director: "Игорь Масленников",
    production: "Ленфильм",
    awardsSummary: "Топ-250, 33 место",
  },
];

const genre = {
  en: "fantasy",
  ru: "Фантастика",
  img: "src/assets/images/genres/fantasy.jpg",
};

const genreList = GENRES;

const user = {
  name: "John",
  surname: "James",
  email: "john@email.com",
  favorites: [],
};

function App() {
  const { refetch } = useFetchProfileQuery();

  // const [isOpen, setIsOpen] = useState(false);

  const { isAuth, user } = useSelector((state: RootState) => state.user);

  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      refetch();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Layout>
      {/* <Button background="accent" onClick={() => setIsOpen(true)}>
        Открыть модальное окно
      </Button>
      {isOpen && (
        <Popup onClose={() => setIsOpen(false)}>
          <AuthForm />
        </Popup>
      )} */}

      {/* <Button onClick={() => console.log(isAuth, user)}>user</Button>
      <Button onClick={handleLogout}>logout</Button> */}

      <MainPage />
    </Layout>
  );
}

export default App;
