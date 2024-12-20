import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Pagination,
  Button,
  Typography,
  CircularProgress,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import styles from './styles.module.scss';
import api from '../../axios';

const Materials = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [materials, setMaterials] = useState([]);
  const [filterMaterials, setFilterMaterials] = useState([]);
  const [isFilter, setIsFilter] = useState(false);
  const [count, setCount] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);

  // Получение данных материалов с сервера
  const loadMaterials = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const { data } = await api.get(`materials-paginated?page=${page}`);

      if (data?.materials) {
        setMaterials(data.materials);
        setCount(data.totalPages);
      } else {
        setMaterials([]);
        toast.warning(data?.message);
      }
    } catch (error) {
      setError('Не удалось загрузить материалы');
      setMaterials([]);
      setCount(1);
    } finally {
      setIsLoading(false);
    }
  }, [page]);

  useEffect(() => {
    loadMaterials();
  }, [loadMaterials]);

  // Обработчик смены страницы
  const handleChangePage = (event, newPage) => setPage(newPage);

  // Поиск материалов
  const searchMaterials = async () => {
    try {
      setIsFilter(true);
      setIsLoading(true);
      const { data } = await api.post('materials/search', {
        str: searchTerm,
      });

      if (!data.length) {
        toast.error(`Нет материалов`);
        setFilterMaterials([]);
      } else {
        toast.success(`Найдено ${data.length} материалов`);
        setFilterMaterials(data);
      }
    } catch (error) {
      toast.error(`Ошибка при поиске материалов`);
      setError('Ошибка при поиске материалов');
      setFilterMaterials([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Сброс поиска
  const resetSearch = () => {
    setIsFilter(false);
    setSearchTerm('');
    setFilterMaterials([]);
  };

  const displayedMaterials = isFilter ? filterMaterials : materials;

  return (
    <div className={styles.materialsPage}>
      <Typography variant="h4" component="h1" className={styles.title}>
        Materials
      </Typography>

      <div className={styles.panel}>
        {/* Поле для поиска */}
        <div className={styles.searchContainer}>
          <TextField
            label="Поиск материала"
            variant="outlined"
            InputProps={{
              classes: {
                input: styles.searchInput,
              },
            }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div>
            <Button
              color="primary"
              variant="contained"
              onClick={searchMaterials}
              disabled={!searchTerm}
              className={styles.btn}
            >
              <SearchIcon />
            </Button>
            <Button
              color="error"
              variant="contained"
              onClick={resetSearch}
              className={styles.btn}
            >
              <RestartAltIcon />
            </Button>
          </div>
        </div>

        <div>
          <Button
            variant="contained"
            color="success"
            className={styles.btn}
            onClick={() => navigate('/materials/add')}
          >
            <AddCircleIcon />
          </Button>
        </div>
      </div>
      {/* Ошибки */}
      {error && (
        <Typography color="error" className={styles.error}>
          {error}
        </Typography>
      )}

      {/* Таблица */}
      <TableContainer component={Paper} className={styles.tableContainer}>
        <Table stickyHeader aria-label="materials table">
          <TableHead>
            <TableRow>
              <TableCell className={styles.tableHeader}>Название</TableCell>
              <TableCell className={styles.tableHeader}>Код Azenco</TableCell>
              <TableCell className={styles.tableHeader}>Цена</TableCell>
              <TableCell className={styles.tableHeader}>Единица</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : displayedMaterials.length > 0 ? (
              displayedMaterials.map((material) => (
                <TableRow key={material.id}>
                  <TableCell className={styles.cell}>{material.name}</TableCell>
                  <TableCell className={styles.cell}>
                    {material.azencoCode}
                  </TableCell>
                  <TableCell className={styles.cell}>
                    {material?.price?.$numberDecimal}
                  </TableCell>
                  <TableCell className={styles.cell}>{material.unit}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  Нет материалов
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Пагинация */}
      {!isFilter && (
        <Pagination
          component="div"
          color="primary"
          count={count}
          page={page}
          onChange={handleChangePage}
          className={styles.pagination}
        />
      )}
    </div>
  );
};

export default Materials;
