import React, { useState, useEffect } from 'react';
import {
  Button,
  Grid,
  TextField,
} from '@mui/material';
import { withStyles } from '@mui/styles';
import { useSnackbar } from 'notistack';

import axios from 'axios';

const styles = (theme) => {
  return {
    container: {
      backgroundPosition: 'top center',
      backgroundAttachment: 'fixed',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      width: '100vw',
    },
    cardTitle: {
      fontFamily: 'Sofia Pro Bold',
      color: '#dfe2f4',
      fontSize: 25,
      padding: 0,
      margin: 0,
    },
    justifyContentCenter: {
      justifyContent: 'center !important',
    },
    cardHeader: {
      marginBottom: '20px',
    },
    textCenter: {
      textAlign: 'center',
    },
  };
};
function BlogForm({ classes, formState, editBlog, fetchBlogs, handleStateForm }) {
  const [blog, setBlog] = useState({
    title: '',
    content: '',
  });
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (formState === 'edit') {
      setBlog({
        title: editBlog.title,
        content: editBlog.content,
      });
    }
  }, [formState, editBlog]);
  const post = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'http://localhost:3000/blog/create',
        {
          title: blog.title,
          content: blog.content,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      );

      if (res) {
        fetchBlogs()
        setBlog({
          title: '',
          content: '',
        });
        handleStateForm()
      } else {
        enqueueSnackbar('Unable to post your blog', {
          variant: 'error',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
        });
      }
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

  const update = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:3000/blog/update/${editBlog.id}`,
        {
          title: blog.title,
          content: blog.content,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      );

      if (res) {
        fetchBlogs()
        setBlog({
          title: '',
          content: '',
        });
        
      } else {
        enqueueSnackbar('Unable to update your blog', {
          variant: 'error',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
        });
      }
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

  const handleChange = (e) => {
    setBlog({
      ...blog,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <div className={classes.container}>
      <Grid container justify="center">
        <Grid lg={3}></Grid>
        <Grid xs={12} sm={6} md={4} lg={6}>
          <form
            autoComplete="off"
            onSubmit={formState === 'edit' ? update : post}
          >
            <TextField
              label="Title"
              onChange={(e) => handleChange(e)}
              id="title"
              required
              variant="outlined"
              color="secondary"
              type="text"
              sx={{ mb: 3 }}
              fullWidth
              value={blog.title}
            />
            <TextField
              label="Content"
              onChange={(e) => handleChange(e)}
              id="content"
              required
              variant="outlined"
              color="secondary"
              type="text"
              value={blog.content}
              fullWidth
              sx={{ mb: 3 }}
              multiline
              rows={4}
            />
            <Button variant="outlined" color="secondary" type="submit">
              {formState === 'edit' && 'Edit'} Post
            </Button>
          </form>
        </Grid>
      </Grid>
    </div>
  );
}

export default withStyles(styles)(BlogForm);
