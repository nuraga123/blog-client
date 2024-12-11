import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import SimpleMDE from 'react-simplemde-editor';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import 'easymde/dist/easymde.min.css';
import api from '../../axios';
import { selectIsAuth } from '../../redux/slices/auth';
import styles from './AddPost.module.scss';
import { CircularProgress } from '@mui/material';
import { toast } from 'react-toastify';

export const AddPost = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);
  const token = localStorage.getItem('token');
  const inputFileRef = useRef(null);
  const onClickInputFileRef = () => inputFileRef.current.click();

  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [tags, setTags] = useState([]);
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);

  const onChange = useCallback((value) => {
    setText(value);
  }, []);

  const onSubmit = async () => {
    try {
      setLoading(true);

      const fields = {
        title,
        text,
        tags: tags.length ? tags.split(',') : [],
        imageUrl,
      };

      if (!isEditable) {
        const { data } = await api.post('/posts', fields);

        console.log(data);
        const newPostId = data._id;
        if (newPostId) {
          setLoading(false);
          navigate(`/posts/${newPostId}`);
        } else {
          setLoading(false);
          toast.warning('Ошибка нет id');
        }
      } else {
        const { data } = await api.patch(`/posts/${id}`, fields);

        console.log(data);
        if (data) {
          setLoading(false);
          alert(`Статья успешно обновлена`);
          navigate(`/posts/${id}`);
        } else {
          setLoading(false);
          alert('Ошибка при изменении статьи');
        }
      }
    } catch (error) {
      console.log(error);
      alert('Ошибка напишите все поля *');
      setLoading(false);
    }
  };

  const options = useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '100px',
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    []
  );

  const handleChangeFile = async (event) => {
    try {
      setLoadingImage(true);
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append('image', file);

      const { data } = await api.post('/uploads', formData);
      console.log(data);
      setImageUrl(data.url);
      setTimeout(() => setLoadingImage(false), 2000);
      clearTimeout();
    } catch (err) {
      alert('Ошибка загрузки файла');
      setLoadingImage(true);
      console.log(err);
      setTimeout(() => setLoadingImage(false), 2000);
      clearTimeout();
    }
  };

  const onClickRemoveImage = () => setImageUrl('');

  const cancelPost = () => {
    setLoading(false);
    setTitle('');
    setText('');
    setTags([]);
    setImageUrl('');
  };

  const isEditable = Boolean(id);

  useEffect(() => {
    if (isEditable) {
      try {
        const loadPost = async (id) => {
          try {
            setLoading(true);
            const { data } = await api.get(`/posts/${id}`);
            console.log('data');
            console.log(data);

            if (data) {
              setLoading(false);
              setTitle(data.title);
              setText(data.text);
              setTags(data.tags.join(','));
              setImageUrl(data.imageUrl);
            }
          } catch (error) {
            console.log('error');
            console.log(error);
            setLoading(false);
          }
        };

        loadPost(id);
      } catch (error) {
        console.log('error');
        console.log(error);
        setLoading(false);
      }
    } else {
      cancelPost();
    }
  }, [id, isEditable]);

  useEffect(() => {
    if (!token && !isAuth) return navigate('/login');
  }, [isAuth, navigate, token]);

  return (
    <Paper style={{ padding: 30 }}>
      <form>
        <Button
          size="large"
          variant="outlined"
          onClick={onClickInputFileRef}
          onChange={handleChangeFile}
        >
          {loadingImage ? (
            <CircularProgress size={30} />
          ) : (
            'Загрузить картинку на сервер'
          )}
        </Button>
        <input
          type="file"
          ref={inputFileRef}
          onChange={handleChangeFile}
          hidden
        />

        <br />

        <br />
        {loadingImage ? (
          <div>
            <CircularProgress size={100} />
          </div>
        ) : (
          imageUrl && (
            <div>
              <img
                aria-hidden
                src={`http://localhost:4444${imageUrl}`}
                alt={`Uploaded image ${imageUrl}`}
              />
              <br />
              <Button
                variant="contained"
                color="error"
                onClick={onClickRemoveImage}
              >
                Удалить картинку
              </Button>
            </div>
          )
        )}
        <br />

        <TextField
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          classes={{ root: styles.title }}
          variant="standard"
          placeholder="Заголовок статьи..."
          fullWidth
        />

        <TextField
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          classes={{ root: styles.tags }}
          variant="standard"
          placeholder="Тэги"
          fullWidth
        />

        <SimpleMDE
          value={text}
          className={styles.editor}
          onChange={onChange}
          options={options}
        />

        <div className={styles.buttons}>
          <Button
            onClick={onSubmit}
            size="large"
            variant="contained"
            color={isEditable ? 'warning' : 'success'}
          >
            {loading ? (
              <CircularProgress size={30} />
            ) : isEditable ? (
              'Редактировать статью'
            ) : (
              'Создать статью'
            )}
          </Button>
          <Button
            onClick={cancelPost}
            color="error"
            size="large"
            variant="contained"
          >
            Отмена
          </Button>
        </div>
      </form>
    </Paper>
  );
};
