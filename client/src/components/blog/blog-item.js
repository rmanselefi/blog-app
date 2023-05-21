import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';

import Delete from '@mui/icons-material/Delete';

import { red } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import Edit from '@mui/icons-material/Edit';
import { useSnackbar } from 'notistack';

export default function BlogItem({ blog, handleEdit, fetchBlogs }) {
  const { created_at, username, content, title, id } = blog;
  var formatted = new Date(created_at);
  const { enqueueSnackbar } = useSnackbar();
  const handleEditClick = () => {
    handleEdit(blog);
  };
  const handleDeleteClick = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`http://localhost:3000/blog/${id}`);
      setOpen(false);
      fetchBlogs();

      enqueueSnackbar('Blog deleted successfully', {
        variant: 'success',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
      });
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: 'error',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
      });
    }
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <React.Fragment>
      <Card sx={{ maxWidth: 345, margin: 5 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              R
            </Avatar>
          }
          action={
            <IconButton aria-label="settings" onClick={handleEditClick}>
              <Edit />
            </IconButton>
          }
          title={username}
          subheader={formatted.toDateString()}
        />

        <CardContent>
          <Typography variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {content}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="settings" onClick={handleClickOpen}>
            <Delete />
          </IconButton>
        </CardActions>
      </Card>

      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{'Deleter Post'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to delete this blog post?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>NO</Button>
          <Button onClick={handleDeleteClick}>YES</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
