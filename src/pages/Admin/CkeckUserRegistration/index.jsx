import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Typography,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { CheckCircle, Block, Warning } from '@mui/icons-material';
import api from '../../../axios';
import { fetchUsers } from '../../../redux/slices/users';
import styles from './styles.module.scss';

const CheckUserRegistration = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);
  const isLoadingUsers = users.status === 'loading';

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const [selectedUser, setSelectedUser] = useState(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleActivateUser = async (user) => {
    setSelectedUser(user);
    setConfirmDialogOpen(true);
  };

  const handleConfirmActivation = async () => {
    try {
      setIsProcessing(true);
      const form = {
        email: selectedUser.email,
        resetPasswordToken: selectedUser.resetPasswordToken,
      };

      const { data } = await api.post('auth/confirm', form);
      console.log(data);
      dispatch(fetchUsers());
    } catch (error) {
      console.error('Error activating user:', error);
    } finally {
      setIsProcessing(false);
      setConfirmDialogOpen(false);
      setSelectedUser(null);
    }
  };

  const handleBlockUser = async (user) => {
    console.log('Block user:', user);
  };

  if (isLoadingUsers) {
    return (
      <div className={styles.user__loading}>
        <CircularProgress size={50} />
      </div>
    );
  }

  return (
    <div className={styles.user}>
      <Typography variant="h4" className={styles.user__title}>
        Users
      </Typography>

      <Paper className={styles.userContainer}>
        <TableContainer>
          <Table className={styles.userTable}>
            <TableHead>
              <TableRow className={styles.userTableHeader}>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.items.map((user) => (
                <TableRow key={user._id} className={styles.userTableRow}>
                  <TableCell className={styles.userTableCell}>
                    {user._id}
                  </TableCell>
                  <TableCell className={styles.userTableCell}>
                    {user.username}
                  </TableCell>
                  <TableCell className={styles.userTableCell}>
                    {user.email}
                  </TableCell>
                  <TableCell className={styles.userTableCell}>
                    {!user.adminCheck ? (
                      <Button
                        variant="contained"
                        className={styles.userButtonActivate}
                        startIcon={<CheckCircle />}
                        onClick={() => handleActivateUser(user)}
                        size="small"
                      >
                        Activate
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        className={styles.userButtonBlock}
                        startIcon={<Block />}
                        onClick={() => handleBlockUser(user)}
                        size="small"
                      >
                        Block
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Dialog
        className={styles.diadlog}
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
      >
        <DialogTitle className={styles.confirmation__dialog__title}>
          Confirm User Activation
        </DialogTitle>
        <DialogContent className={styles.confirmation__dialog__content}>
          Are you sure you want to activate {selectedUser?.fullName}?
        </DialogContent>
        <DialogActions className={styles.confirmation__dialog__btns}>
          <Button
            onClick={() => setConfirmDialogOpen(false)}
            disabled={isProcessing}
            color="error"
            variant="contained"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmActivation}
            variant="contained"
            disabled={isProcessing}
            color="success"
          >
            {isProcessing ? <CircularProgress size={24} /> : 'Confirm'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CheckUserRegistration;
