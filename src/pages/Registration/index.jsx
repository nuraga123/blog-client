import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import emailjs from 'emailjs-com';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { selectIsAuth, fetchRegistration } from '../../redux/slices/auth';
import { useTranslation } from '../../hook/useTranslation';
import styles from './Login.module.scss';
import api from '../../axios';
import { AxiosError } from 'axios';

export const Registration = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = React.useState(false);
  const { translate } = useTranslation();
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
      password_confirm: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (values) => {
    try {
      console.log(values.username);
      console.log('register()');
      emailjs
        .send(
          'service_r4cs4ki',
          'template_wbq8mmw',
          {
            name: values.username,
            email: values.email,
            message: 'register new user',
          },
          'HLw8oWldpeZ3uCvoa'
        )
        .then(
          (res) => {
            if (res.status === 200) toast.success(translate('email_success'));
          },
          (error) => {
            toast.error(translate('error_send'));
            console.log('Ошибка при отправке:', error);
          }
        );

      const { data } = await api.post('auth/register', values);
      if (data?.message === 'confirm_admin') {
        toast.success(translate('email_success'));
        return data;
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        return {
          message: error.response.data.message,
          user: null,
        };
      }
    }

    // const { payload } = await dispatch(fetchRegistration(values));

    // if (payload && payload.message) {
    //   toast.error(payload.message);
    // }

    // if (payload?.token) {
    //   localStorage.setItem('token', payload.token);
    //   toast.success(translate('register_success'));
    //   // navigate('/');
    // }
  };

  if (isAuth) navigate('/');

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        {translate('register_title')}
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <TextField
          {...register('username', {
            required: translate('username_invalid'),
            minLength: {
              value: 4,
              message: translate('username_invalid'),
            },
          })}
          type="text"
          className={styles.field}
          error={Boolean(errors.username?.message)}
          helperText={errors.username?.message}
          label={translate('username')}
          fullWidth
        />

        <TextField
          {...register('email', {
            required: translate('email_required'),
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: translate('email_invalid'),
            },
          })}
          type="email"
          className={styles.field}
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          label={translate('email')}
          fullWidth
        />

        <TextField
          {...register('password', {
            required: translate('password_required'),
            minLength: {
              value: 8,
              message: translate('password_min'),
            },
          })}
          type={showPassword ? 'text' : 'password'}
          className={styles.field}
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          label={translate('password')}
          fullWidth
          slotProps={{
            input: {
              endAdornment: showPassword ? (
                <Visibility
                  onClick={() => setShowPassword(false)}
                  sx={{
                    cursor: 'pointer',
                  }}
                />
              ) : (
                <VisibilityOff
                  onClick={() => setShowPassword(true)}
                  sx={{
                    cursor: 'pointer',
                  }}
                />
              ),
            },
          }}
        />

        <TextField
          {...register('password_confirm', {
            required: translate('password_required'),
            minLength: {
              value: 8,
              message: translate('password_min'),
            },
          })}
          type={showPasswordConfirm ? 'text' : 'password'}
          className={styles.field}
          error={Boolean(errors.password_confirm?.message)}
          helperText={errors.password_confirm?.message}
          label={translate('password_сonfirm')}
          autoComplete="new-password"
          fullWidth
          slotProps={{
            input: {
              endAdornment: showPasswordConfirm ? (
                <Visibility
                  onClick={() => setShowPasswordConfirm(false)}
                  sx={{
                    cursor: 'pointer',
                  }}
                />
              ) : (
                <VisibilityOff
                  onClick={() => setShowPasswordConfirm(true)}
                  sx={{
                    cursor: 'pointer',
                  }}
                />
              ),
            },
          }}
        />

        <Button
          type="submit"
          // disabled={!isValid}
          size="large"
          variant="contained"
          fullWidth
        >
          {translate('register_btn')}
        </Button>
      </form>
    </Paper>
  );
};
