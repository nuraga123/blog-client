import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import Container from "@mui/material/Container";

import { Home, FullPost, Registration, AddPost, Login } from "./pages";
import { Header } from "./components";
import NotFoundPage from "./components/Error";
import Loading from "./components/Loading";
import { fetchAuthMe, selectIsAuth } from "./redux/slices/auth";
import { LanguageProvider } from "./hook/useTranslation";
import { useEffect } from "react";
import Support from "./pages/Support";
import Admin from "./pages/Admin";
import { ResetPassword } from "./pages/ResetPassword";


function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const status = useSelector((state) => state?.auth?.status);

  useEffect(() => dispatch(fetchAuthMe()), [dispatch])

  if (status === "loading") {
    return (
      <LanguageProvider>
        <Loading />
      </LanguageProvider>
    )
  }


  if (!isAuth) {
    return <LanguageProvider>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/support" element={<Support />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </Container>
    </LanguageProvider>
  } else {

    return (<LanguageProvider>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/*" element={<NotFoundPage />} />
          <Route path="/posts/:id" element={<FullPost />} />
          <Route path="/posts/:id/edit" element={<AddPost />} />
          <Route path="/add-post" element={<AddPost />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Container>
    </LanguageProvider>
    )
  }
}

export default App;
