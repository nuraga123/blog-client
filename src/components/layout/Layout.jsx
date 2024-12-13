import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import DescriptionIcon from '@mui/icons-material/Description';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import DehazeIcon from '@mui/icons-material/Dehaze';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import ShoppingCart from '@mui/icons-material/ShoppingCart';

export function DashboardLayout({ children }) {
  const [isHovered, setIsHovered] = useState(
    localStorage.getItem('nav') ? localStorage.getItem('nav') : 'open'
  );

  const navHeight = window.innerHeight - 70;

  const NAVIGATION = [
    {
      path: '/',
      title: 'Главная',
      icon: <HomeIcon sx={{ color: 'wheat' }} />,
    },
    {
      path: '/posts',
      title: 'Посты',
      icon: <DescriptionIcon sx={{ color: 'wheat' }} />,
    },
    {
      path: '/admin',
      title: 'Админ',
      icon: <AdminPanelSettingsIcon sx={{ color: 'wheat' }} />,
    },
    {
      path: '/materials',
      title: 'materials',
      icon: <ShoppingCart sx={{ color: 'wheat' }} />,
    },
  ];

  return (
    <div>
      <Box
        sx={{
          display: 'flex',
        }}
      >
        <Drawer
          variant="permanent"
          sx={{
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              backgroundColor: '#1976d2',
              color: '#fff',
              position: 'sticky',
              top: 70,
              width: '100%',
              maxWidth: isHovered === 'open' ? 300 : 52,
              height: navHeight,
              overflowX: 'hidden',
              transition: 'max-width 0.3s ease-in-out',
              '&:hover': {
                maxWidth: 300,
              },
            },
            '& .MuiListItemIcon-root': {
              minWidth: 35,
              padding: 0,
            },
          }}
        >
          <List>
            {isHovered === 'open' ? (
              <ListItemButton
                onClick={() => {
                  setIsHovered('close');
                  localStorage.setItem('nav', 'close');
                }}
              >
                <MenuOpenIcon />
              </ListItemButton>
            ) : (
              <ListItemButton
                onClick={() => {
                  setIsHovered('open');
                  localStorage.setItem('nav', 'open');
                }}
              >
                <DehazeIcon />
              </ListItemButton>
            )}

            {NAVIGATION.map((item) => (
              <ListItem
                key={item.title}
                disablePadding
                sx={{
                  minWidth: 30,
                }}
              >
                <ListItemButton
                  component={Link}
                  to={item.path}
                  sx={{
                    borderBottom: '1px solid #c9c9c9',
                    '&:hover': {
                      backgroundColor: '#1565c0',
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: '#fff' }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.title}
                    primaryTypographyProps={{
                      fontSize: '16px',
                      fontWeight: 'medium',
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 1,
            backgroundColor: '#fff',
            borderRadius: 2,
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          }}
        >
          {children}
        </Box>
      </Box>
    </div>
  );
}
