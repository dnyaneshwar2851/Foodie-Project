import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { setDialogOpen, setRestauranInfo, setRecordUpdated } from '../utils/restaurantSlice';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const CustomDialog = () => {
  const dispatch = useDispatch();
  const isDialogOpen = useSelector(store => store.resReducer.isDialogOpen);
  const restaurantInfo = useSelector(store => store.resReducer.restaurantInfo);

  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  const handleClose = () => {
    dispatch(setRestauranInfo({}));
    dispatch(setDialogOpen(false));
  };

  const handleSave = () => {
    if (restaurantInfo.id) {
      updateRecord(restaurantInfo.id);
    } else {
      addRecord();
    }
    dispatch(setRestauranInfo({}));
    dispatch(setDialogOpen(false));
  };

  const updateRecord = async (resId) => {
    try {
      const response = await fetch(`http://localhost:5111/restaurants/${resId}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: resId, name: name, description: description, location: location }),
      });

      if (response.ok) {
        dispatch(setRecordUpdated(true));
      } else {
        console.error('Failed to update record');
      }
    } catch (error) {
      console.error('An error occurred while updating the record', error);
    }
  };

  const addRecord = async () => {
    try {
      const response = await fetch('http://localhost:5111/restaurants', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: Math.floor((Math.random() * 1000) + 1), name: name, description: description, location: location }),
      });

      if (response.ok) {
        dispatch(setRecordUpdated(true));
      } else {
        console.error('Failed to add record');
      }
    } catch (error) {
      console.error('An error occurred while adding the record', error);
    }
  };

  useEffect(() => {
    if (restaurantInfo) {
      setName(restaurantInfo.name);
      setDescription(restaurantInfo.description);
      setLocation(restaurantInfo.location);
    }
  }, [restaurantInfo]);

  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={isDialogOpen}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Enter Restaurant Detail
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <TextField
          style={{ display: 'block', margin: '3vw 5vw' }}
          value={name}
          onChange={(e) => setName(e.target.value)}
          id="outlined-basic"
          label="Restaurant Name"
          variant="outlined"
        />
        <TextField
          style={{ display: 'block', margin: '3vw 5vw' }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          id="outlined-basic"
          label="Restaurant Description"
          variant="outlined"
        />
        <TextField
          style={{ display: 'block', margin: '3vw 5vw' }}
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          id="outlined-basic"
          label="Restaurant Location"
          variant="outlined"
        />
      </DialogContent>
      <DialogActions>
        <Button type="button" className="btn btn-primary" autoFocus onClick={handleSave}>
          Save changes
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
};

export default CustomDialog;
