import React, { useState } from 'react';
import {
  Button,
  Grid,
  TextField,
} from '@mui/material';
import { withStyles } from '@mui/styles';
import { useSnackbar } from 'notistack';
import { Link, useNavigate, Navigate } from 'react-router-dom';

import axios from 'axios';

const styles = (theme) => {
  return {
    container: {
      backgroundPosition: 'top center',
      backgroundAttachment: 'fixed',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
    },

    cardTitle: {
      color: '#dfe2f4',
      fontFamily: 'Sofia Pro Regular',
      fontSize: 20,
      padding: 0,
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

function Login({ history, classes }) {
  const [user, setUser] = useState({
    username: '',
    password: '',
  });
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/auth/login', {
        username: user.username,
        password: user.password,
      });

      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        return navigate('/blogs');
      } else {
        enqueueSnackbar('Invalid username or password', {
          variant: 'error',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
        });
      }
    } catch (error) {
      enqueueSnackbar('Invalid username or password', {
        variant: 'error',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
      });
    }
  };
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.id]: e.target.value,
    });
  };

  if (localStorage.getItem('token')) {
    return <Navigate to="/blogs" />;
  }

 
  return (
    <div className={classes.container}>
      <Grid container justify="center">
        <Grid lg={3}></Grid>
        <Grid xs={12} sm={6} md={4} lg={6}>
          <form autoComplete="off" onSubmit={login}>
            <h2>Login Here</h2>
            <TextField
              label="Username"
              onChange={(e) => handleChange(e)}
              id='username'
              required
              variant="outlined"
              color="secondary"
              type="text"
              sx={{ mb: 3 }}
              fullWidth
              value={user.username}
            />
            <TextField
              label="Password"
              onChange={(e) => handleChange(e)}
              id='password'
              required
              variant="outlined"
              color="secondary"
              type="password"
              value={user.password}
              fullWidth
              sx={{ mb: 3 }}
            />
            <Button variant="outlined" color="secondary" type="submit">
              Login
            </Button>
          </form>
          <small>
            Need an account? <Link to="/signup">Register here</Link>
          </small>
        </Grid>
        <Grid lg={3}></Grid>
      </Grid>
    </div>
  );
}

export default withStyles(styles)(Login);
