import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import BlogItem from './blog-item';
import { useNavigate } from 'react-router-dom';
import BlogForm from './blog-form';
import axios from 'axios';
import { Pagination } from '@mui/material';
import Container from '@mui/material/Container';

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const [formState, setFormState] = useState('add');
  const [editBlog, setEditBlog] = useState({});

  const navigate = useNavigate();

  const fetchBlogs = async (page) => {
    const res = await axios.post(
      'http://localhost:3000/blog',
      {
        take: 2,
        skip: page,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    );
    setBlogs(res.data.data);
    setTotal( Math.ceil(res.data.total/2));
  };

  useEffect(() => {
    fetchBlogs(page);
  }, [page]);

  const handleClick = () => {
    localStorage.removeItem('token');
    return navigate('/');
  };

  const handleEdit = (blog) => {
    setFormState('edit');
    setEditBlog(blog);
  };
  const handleStateForm = () => {
    setFormState('add');
  };

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Blog APP
          </Typography>
          <Button color="inherit" onClick={handleClick}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <br />
      <BlogForm
        formState={formState}
        editBlog={editBlog}
        fetchBlogs={fetchBlogs}
        handleStateForm={handleStateForm}
      />
      <Container maxWidth="sm">
        {' '}
        {blogs &&
          blogs.map((bl) => {
            return (
              <BlogItem
                key={bl.id}
                blog={bl}
                handleEdit={handleEdit}
                fetchBlogs={fetchBlogs}
              />
            );
          })}
        <Pagination count={total} page={page} onChange={handleChange} />
      </Container>
    </Box>
  );
}

export default Blogs;
