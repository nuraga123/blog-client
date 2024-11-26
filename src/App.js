import Container from "@mui/material/Container";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components";
import { Home, FullPost, Registration, AddPost, Login } from "./pages";
import NotFoundPage from "./components/Error";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthMe, selectIsAuth } from "./redux/slices/auth";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  useEffect(() => {
    const loadToken = async () => {
      const data = await dispatch(fetchAuthMe());
      console.log(data);
    }

    loadToken();

  }, [dispatch]);

  if (!isAuth) {
    return <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="*" element={<Login />} />

        </Routes>
      </Container>
    </>
  } else {


    return (
      <>
        <Header />
        <Container maxWidth="lg">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts/:id" element={<FullPost />} />
            <Route path="/posts/:id/edit" element={<AddPost />} />
            <Route path="/add-post" element={<AddPost />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Container>
      </>
    );
  }
}

export default App;
