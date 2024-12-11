import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import Container from '@mui/material/Container';

import {
  AddPost,
  Admin,
  Login,
  Registration,
  FullPost,
  Home,
  Support,
} from './pages';
import { Header, NotFoundPage, Loading } from './components';
import { fetchAuthMe, selectIsAuth } from './redux/slices/auth';
import { LanguageProvider } from './hook/useTranslation';
import { DashboardLayout } from './components/layout/Layout';

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const status = useSelector((state) => state?.auth?.status);

  useEffect(() => dispatch(fetchAuthMe()), [dispatch]);

  if (status === 'loading') {
    return (
      <LanguageProvider>
        <Loading />
      </LanguageProvider>
    );
  }

  if (!isAuth) {
    return (
      <LanguageProvider>
        <Header />
        <Container maxWidth="lg">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/*" element={<NotFoundPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/support" element={<Support />} />
          </Routes>
        </Container>
      </LanguageProvider>
    );
  } else {
    return (
      <LanguageProvider>
        <Header />
        <DashboardLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/*" element={<NotFoundPage />} />
            <Route path="/posts/:id" element={<FullPost />} />
            <Route path="/posts/:id/edit" element={<AddPost />} />
            <Route path="/add-post" element={<AddPost />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </DashboardLayout>
      </LanguageProvider>
    );
  }
}

export default App;
