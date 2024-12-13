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
  Button,
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
  const handleChangePage = (event, newPage) => {
    console.log('newPage');
    console.log(newPage);
    setPage(newPage);
  };

  return (
    <div className={styles.materialsPage}>
      <h1>materiallar</h1>
      {/* Поле для поиска */}

      <TextField
        label="Поиск материала"
        variant="outlined"
        className={styles.searchInput}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className={styles.buttons}>
        <Button color="success" variant="contained">
          add material
        </Button>
        <Button color="success" variant="contained">
          add material
        </Button>
      </div>

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
                  <TableCell
                    sx={{
                      border: '1px solid #ddd',
                      padding: 1,
                    }}
                  >
                    {material.name}
                  </TableCell>
                  <TableCell
                    sx={{
                      border: '1px solid #ddd',
                      padding: 1,
                    }}
                  >
                    {material.azencoCode}
                  </TableCell>
                  <TableCell
                    sx={{
                      border: '1px solid #ddd',
                      padding: 1,
                    }}
                  >
                    {material?.price?.$numberDecimal}
                  </TableCell>
                  <TableCell
                    sx={{
                      border: '1px solid #ddd',
                      padding: 1,
                    }}
                  >
                    {material.unit}
                  </TableCell>
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
        onChange={handleChangePage}
        className={styles.pagination}
      />
    </div>
  );
};

export default Materials;
