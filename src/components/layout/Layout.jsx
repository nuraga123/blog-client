import Container from '@mui/material/Container';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components';
import { Home, FullPost, Registration, AddPost, Login } from './pages';
import NotFoundPage from './components/Error';

const Layout = ({ isAuth }) => {
  if (!isAuth)
    return (
      <>
        <Header />
        <Login />;
      </>
    );

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:id" element={<FullPost />} />
          <Route path="/posts/:id/edit" element={<AddPost />} />
          <Route path="/add-post" element={<AddPost />} />

          <Route path="/register" element={<Registration />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Container>
    </>
  );
};

export default Layout;
