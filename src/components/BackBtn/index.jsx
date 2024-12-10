import React from 'react';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const BackBtn = ({ url, fn = '', mr = 0 }) => {
  const navigate = useNavigate();
  return (
    <Button
      sx={{
        padding: 1,
        width: 35,
        minWidth: 35,
        height: 30,
        borderRadius: 2,
        margin: mr ? mr : '0',
        fontSize: 16,
      }}
      onClick={fn ? fn : () => navigate(`/${url}`)}
      variant="contained"
      color="secondary"
    >
      <ArrowBackIcon />
    </Button>
  );
};

export default BackBtn;
