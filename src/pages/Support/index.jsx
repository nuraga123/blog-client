import React, { useState } from 'react';
import { Button, Box } from '@mui/material';
import { useTranslation } from '../../hook/useTranslation';
import SendMyEmailUserProblems from '../../components/SendMyEmailUserProblems';
import { ResetPassword } from '../../components/ResetPassword';
import BackBtn from '../../components/BackBtn';

export const Support = () => {
  const { translate } = useTranslation();
  const [openMenu, setOpenMenu] = useState('all');

  return (
    <Box
      sx={{
        width: '100%',
        margin: '0 auto',
        padding: '5px ',
        backgroundColor: '#F5F5F5',
        borderRadius: '4px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: '5px',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
      }}
    >
      <div style={{ width: '100%' }}>
        {openMenu === 'all' ? (
          <BackBtn url={'login'} />
        ) : (
          <BackBtn fn={() => setOpenMenu('all')} />
        )}
      </div>

      {openMenu === 'all' ? (
        <div>
          <p
            style={{
              margin: '20px 0',
              fontSize: '18px',
              lineHeight: '24px',
              fontWeight: 'normal',
              color: '#3F51B5',
              display: 'block',
              width: '100%',
              padding: '10px',
              border: '1px solid',
              borderRadius: '4px',
              backgroundColor: '#F5F5F5',
              whiteSpace: 'pre-line',
              lineHeightStep: 1.5,
            }}
          >
            {translate('support_text')}
          </p>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              borderRadius: '4px',
              backgroundColor: '#F5F5F5',
            }}
          >
            <Button variant="contained" onClick={() => setOpenMenu('password')}>
              {translate('forgot_password')}
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={() => setOpenMenu('token')}
            >
              {translate('token_btn')}
            </Button>
          </div>
        </div>
      ) : openMenu === 'password' ? (
        <SendMyEmailUserProblems />
      ) : (
        <ResetPassword />
      )}
    </Box>
  );
};
