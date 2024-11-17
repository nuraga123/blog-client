import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import styles from './Login.module.scss';
import { fetchAuth, selectIsAuth } from '../../redux/slices/auth';

export const Login = () => {
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: 'ivan@gmail.com',
      password: '12345678',
    },
    mode: 'onChange',
  });

  const onSubmit = async (values) => {
    const { payload } = await dispatch(fetchAuth(values));
    return payload
      ? localStorage.setItem('token', payload.token)
      : alert('не удалось авторизоваться !');
  };

  if (isAuth) return navigate('/');

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register('email', {
            required: 'Введите почту',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Неверный формат почты',
            },
          })}
          className={styles.field}
          label="E-Mail"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
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
          className={styles.field}
          label="Пароль"
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          fullWidth
        />
        <Button
          type="submit"
          size="large"
          variant="contained"
          fullWidth
          disabled={!isValid}
        >
          Войти
        </Button>
      </form>
    </Paper>
  );
};
