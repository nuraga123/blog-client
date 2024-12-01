import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import emailjs from 'emailjs-com';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
// import { useTranslation } from '../../hook/useTranslation';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Support = () => {
  const navigate = useNavigate();
  //const { translate } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Имя обязательно.';
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Введите корректный email.';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Сообщение обязательно.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    emailjs
      .send(
        'service_r4cs4ki',
        'template_wbq8mmw',
        formData,
        'HLw8oWldpeZ3uCvoa'
      )
      .then(
        (res) => {
          setIsSubmitted(true);
          toast.success(
            `Сообщение отправлено! Мы свяжемся с вами в ближайшее время. ${res.text}`
          );
          //setFormData({ name: '', email: '', message: '' });
        },
        (error) => {
          toast.error('Ошибка при отправке сообщения.');
          console.log('Ошибка при отправке:', error);
        }
      );
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 500,
        mx: 'auto',
        p: 3,
        border: '1px solid #ccc',
        borderRadius: 2,
        backgroundColor: '#f9f9f9',
      }}
    >
      <Typography
        variant="h5"
        textAlign="center"
        mb={3}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: 50,
        }}
      >
        <Button
          sx={{
            padding: 1,
            width: 40,
            margin: '10px 0',
            fontSize: 16,
          }}
          onClick={() => navigate('/')}
          variant="contained"
          color="secondary"
          fullWidth
        >
          <ArrowBackIcon />
        </Button>
        <br />
        <div>Связаться с нами</div>
      </Typography>
      {isSubmitted && (
        <Typography variant="body1" color="success.main" mb={2}>
          Сообщение успешно отправлено!
        </Typography>
      )}
      <TextField
        label="Имя"
        name="name"
        value={formData.name}
        onChange={handleChange}
        fullWidth
        error={!!errors.name}
        helperText={errors.name}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        fullWidth
        error={!!errors.email}
        helperText={errors.email}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Сообщение"
        name="message"
        value={formData.message}
        onChange={handleChange}
        fullWidth
        rows={2}
        error={!!errors.message}
        helperText={errors.message}
        sx={{ mb: 2 }}
      />
      <br />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={errors.email || errors.message || errors.name}
      >
        Отправить
      </Button>
      <br />
      <br />
      <Button
        type="submit"
        variant="contained"
        color="success"
        fullWidth
        onClick={() => navigate('/reset-password')}
      >
        я знаю токен
      </Button>
    </Box>
  );
};

export default Support;
