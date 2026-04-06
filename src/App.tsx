import { useFetchProfileQuery } from "@api/authApi";
import { Layout } from "@components/Layout/Layout";
import { MainPage } from "@pages/MainPage";

function App() {
  useFetchProfileQuery();

  return (
    <Layout>
      <MainPage />
    </Layout>
  );
}

export default App;
