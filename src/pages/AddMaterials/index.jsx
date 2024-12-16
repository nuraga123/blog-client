import React, { useState } from 'react';
import {
  TextField,
  Button,
  MenuItem,
  Typography,
  Alert,
  CircularProgress,
} from '@mui/material';
import api from '../../axios'; // Подключение вашего настроенного экземпляра axios
import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';

const AddMaterialForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    azencoCode: '',
    price: '',
    unit: '',
  });

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const units = [
    'cm',
    'meter',
    'km',
    'kilogram',
    'piece',
    'liter',
    'gram',
    'ton',
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // Валидация на стороне клиента
    const { name, azencoCode, price, unit } = formData;
    if (!name || !azencoCode || !price || !unit) {
      setError('Пожалуйста, заполните все поля.');
      return;
    }

    setIsLoading(true);
    try {
      const { data } = await api.post('/material/add', formData);
      console.log(data);

      setSuccess(true);
      setFormData({ name: '', azencoCode: '', price: '', unit: '' });

      if (data?.id) {
        setSuccess(true);
        setFormData({ name: '', azencoCode: '', price: '', unit: '' });
        //navigate(`materilas/${data?.id}`);
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Произошла ошибка при добавлении материала.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.addMaterialForm}>
      <Typography variant="h4" component="h1" className={styles.title}>
        Добавить материал
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">Материал успешно добавлен!</Alert>}

      <form onSubmit={handleSubmit} className={styles.form}>
        <TextField
          label="Название"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          variant="outlined"
          fullWidth
          required
          margin="normal"
        />

        <TextField
          label="Код Azenco"
          name="azencoCode"
          value={formData.azencoCode}
          onChange={handleInputChange}
          variant="outlined"
          fullWidth
          required
          margin="normal"
        />

        <TextField
          label="Цена"
          name="price"
          type="number"
          value={formData.price}
          onChange={handleInputChange}
          variant="outlined"
          fullWidth
          required
          margin="normal"
        />

        <TextField
          select
          label="Единица измерения"
          name="unit"
          value={formData.unit}
          onChange={handleInputChange}
          variant="outlined"
          fullWidth
          required
          margin="normal"
        >
          {units.map((unit) => (
            <MenuItem key={unit} value={unit}>
              {unit}
            </MenuItem>
          ))}
        </TextField>

        <Button
          type="submit"
          color="primary"
          variant="contained"
          fullWidth
          disabled={isLoading}
          className={styles.submitButton}
        >
          {isLoading ? <CircularProgress size={24} /> : 'Добавить материал'}
        </Button>
      </form>
    </div>
  );
};

export default AddMaterialForm;
