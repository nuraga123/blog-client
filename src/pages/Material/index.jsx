import React, { useState, useEffect, useCallback } from 'react';
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
} from '@mui/material';
import styles from './styles.module.scss'; // Подключение SCSS-стилей
import api from '../../axios';

const Materials = () => {
  const [materials, setMaterials] = useState([]);
  const [count, setCount] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [filteredMaterials, setFilteredMaterials] = useState([]);

  // Получение данных материалов с сервера
  const loadMaterials = useCallback(async () => {
    try {
      const { data } = await api.get(`materials/paginated/?page=${page}`);
      setMaterials(data.materials);
      setCount(data.totalPages);
    } catch (error) {
      setMaterials([]);
      setCount(1);
      console.error(error);
    }
  }, [page]);

  // Фильтрация материалов
  useEffect(() => {
    const filtered = materials.filter((material) =>
      material.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMaterials(filtered);
  }, [materials, searchTerm]);

  useEffect(() => {
    loadMaterials();
  }, [loadMaterials]);

  // Обработчик смены страницы
  const handleChangePage = (event, newPage) => setPage(newPage);

  // Обработчик смены количества строк на странице
  const handleChangeRowsPerPage = (event) => setPage(1);

  return (
    <div className={styles.materialsPage}>
      {/* Поле для поиска */}
      <TextField
        label="Поиск материала"
        variant="outlined"
        fullWidth
        className={styles.searchInput}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Таблица */}
      <TableContainer component={Paper} className={styles.tableContainer}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell className={styles.tableHeader}>Название</TableCell>
              <TableCell className={styles.tableHeader}>Код Azenco</TableCell>
              <TableCell className={styles.tableHeader}>Цена</TableCell>
              <TableCell className={styles.tableHeader}>Единица</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredMaterials?.length > 0 ? (
              filteredMaterials?.map((material) => (
                <TableRow key={material.id}>
                  <TableCell>{material.name}</TableCell>
                  <TableCell>{material.azencoCode}</TableCell>
                  <TableCell>{material?.price?.$numberDecimal}</TableCell>
                  <TableCell>{material.unit}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  Нет данных
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Пагинация */}

      <Pagination
        component="div"
        color="primary"
        count={count}
        page={page}
        onPageChange={handleChangePage}
        className={styles.pagination}
      />
    </div>
  );
};

export default Materials;
