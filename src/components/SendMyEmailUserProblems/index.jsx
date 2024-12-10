import React, { useState } from 'react';
import { TextField, Box, Typography, Button } from '@mui/material';
import emailjs from 'emailjs-com';
import { toast } from 'react-toastify';
import { CircularProgress } from '@mui/material';
import { useTranslation } from '../../hook/useTranslation';

const SendMyEmailUserProblems = () => {
  const [loading, setLoading] = useState(false);
  const { translate } = useTranslation();
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
      newErrors.name = translate('username_invalid');
    }

    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = translate('email_invalid');
    }

    if (!formData.message.trim()) {
      newErrors.message = translate('message_invalid');
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error(translate('error_send'));
      return;
    }

    setLoading(true);

    emailjs
      .send(
        'service_r4cs4ki',
        'template_wbq8mmw',
        formData,
        'HLw8oWldpeZ3uCvoa'
      )
      .then(
        (res) => {
          console.log('SUCCESS!', res);
          setIsSubmitted(true);
          setTimeout(() => setIsSubmitted(false), 2000);
          setLoading(false);
          toast.success(translate('email_success'));

          setFormData({
            name: '',
            email: '',
            message: '',
          });
        },
        (error) => {
          toast.error(translate('error_send'));
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
          justifyContent: 'center',
          alignItems: 'center',
          height: 50,
        }}
      >
        <div style={{ fontSize: 18 }}>{translate('support_title')}</div>
      </Typography>
      {isSubmitted && (
        <Typography variant="body1" color="success.main" mb={2}>
          {translate('email_success')}
        </Typography>
      )}
      <TextField
        label={translate('message')}
        name="message"
        value={formData.message}
        onChange={handleChange}
        fullWidth
        rows={2}
        error={!!errors.message}
        helperText={errors.message}
        sx={{ mb: 2 }}
      />

      <TextField
        label={translate('username')}
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

      <Button
        type="submit"
        variant={loading ? 'outlined' : 'contained'}
        disabled={errors.email || errors.message || errors.name}
      >
        {loading ? (
          <CircularProgress size={30} />
        ) : (
          <span>{translate('send')}</span>
        )}
      </Button>
    </Box>
  );
};

export default SendMyEmailUserProblems;
