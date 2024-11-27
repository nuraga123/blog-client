import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';

import styles from './Login.module.scss';
import { fetchAuth, selectIsAuth } from '../../redux/slices/auth';
import { fetchUsers } from '../../redux/slices/users';

export const Login = () => {
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: { email: '', password: '' },
    mode: 'all',
  });

  console.log(errors);

  const onSubmit = async (values) => {
    const { payload } = await dispatch(fetchAuth(values));
    if (payload) {
      localStorage.setItem('token', payload.token);
      navigate('/');
    } else {
      alert('не удалось авторизоваться!');
    }
  };

  const emails = users.items.map((el) => {
    return { email: el.email };
  });

  if (isAuth) return navigate('/');

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      {errors?.email?.message && (
        <div
          style={{
            color: '#FF0000',
            marginBottom: 10,
            marginLeft: 10,
          }}
        >
          {errors?.email?.message}
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <Autocomplete
          options={emails}
          getOptionLabel={(option) => (option?.email ? option.email : '')}
          error={Boolean(errors?.email?.message)}
          onInputChange={(event, value) => {
            event.isDefaultPrevented();
            setValue('email', value);
            clearErrors('email');
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              {...register('email', {
                required: 'Введите почту',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Неверный формат почты',
                },
              })}
              className={styles.field}
              label="E-Mail"
              helperText={Boolean(errors?.email?.message)}
              fullWidth
            />
          )}
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
