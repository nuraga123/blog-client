import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import styles from './Login.module.scss';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectIsAuth, fetchRegistration } from '../../redux/slices/auth';

export const Registration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (values) => {
    const { payload } = await dispatch(fetchRegistration(values));
    if (payload) {
      localStorage.setItem('token', payload.token);
      navigate('/');
    } else {
      alert('Ошибка при регистрации !');
    }
  };

  if (isAuth) return navigate('/');

  console.log(errors);

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <TextField
          {...register('username', {
            required: 'Введите имя',
            minLength: {
              value: 4,
              message: 'Имя должно быть не менее 4 символов',
            },
          })}
          className={styles.field}
          error={Boolean(errors.username?.message)}
          helperText={errors.username?.message}
          label="Полное имя"
          fullWidth
        />

        <TextField
          {...register('email', {
            required: 'Введите почту',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Неверный формат почты',
            },
          })}
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          className={styles.field}
          label="E-Mail"
          fullWidth
        />

        <TextField
          {...register('password', {
            required: 'Введите пароль',
            minLength: {
              value: 8,
              message: 'Пароль должен быть не менее 8 символов',
            },
          })}
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          className={styles.field}
          label="Пароль"
          fullWidth
        />

        <Button
          type="submit"
          disabled={!isValid}
          size="large"
          variant="contained"
          fullWidth
        >
          Войти
        </Button>
      </form>
    </Paper>
  );
};
