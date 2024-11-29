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
import { useTranslation } from '../../hook/useTranslation';

export const Login = () => {
  const { translate } = useTranslation(); // Подключение перевода
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

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

  const onSubmit = async (values) => {
    const { payload } = await dispatch(fetchAuth(values));
    if (payload) {
      localStorage.setItem('token', payload.token);
      navigate('/');
    } else {
      alert(translate('auth_failed'));
    }
  };

  const emails = users.items.map((el) => {
    return { email: el.email };
  });

  if (isAuth) return navigate('/');

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        {translate('login')}
      </Typography>
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
                required: translate('email_required'),
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: translate('email_invalid'),
                },
              })}
              className={styles.field}
              label={
                Boolean(errors?.email?.message)
                  ? errors?.email?.message
                  : translate('email')
              }
              error={Boolean(errors?.email?.message)}
              helperText={Boolean(errors?.email?.message)}
              fullWidth
            />
          )}
        />

        <TextField
          {...register('password', {
            required: translate('password_required'),
            minLength: {
              value: 8,
              message: translate('password_min'),
            },
          })}
          className={styles.field}
          label={translate('password')}
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
          {translate('login')}
        </Button>
      </form>
    </Paper>
  );
};
