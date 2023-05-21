import React, { useState } from 'react';
import { Button, Grid, TextField } from '@mui/material';
import { withStyles } from '@mui/styles';
import { useSnackbar } from 'notistack';
import { useNavigate, Link } from 'react-router-dom';

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
function Signup({ classes }) {
  const [user, setUser] = useState({
    username: '',
    password: '',
  });
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const signup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/auth/register', {
        username: user.username,
        password: user.password,
      });

      if (res) {
        return navigate('/');
      } else {
        enqueueSnackbar('Something went wrong please contact system admin', {
          variant: 'error',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
        });
      }
    } catch (error) {
      enqueueSnackbar('Something went wrong please contact system admin', {
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

  return (
    <div className={classes.container}>
      <Grid container justify="center">
        <Grid lg={3}></Grid>
        <Grid xs={12} sm={6} md={4} lg={6}>
          <form autoComplete="off" onSubmit={signup}>
            <h2>Signup here</h2>
            <TextField
              label="Username"
              onChange={handleChange}
              id="username"
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
              onChange={handleChange}
              id="password"
              required
              variant="outlined"
              color="secondary"
              type="password"
              value={user.password}
              fullWidth
              sx={{ mb: 3 }}
            />
            <Button variant="outlined" color="secondary" type="submit">
              Sign Up
            </Button>
          </form>
          <small>
            Already have an account? <Link to="/">Login here</Link>
          </small>
        </Grid>
      </Grid>
    </div>
  );
}

export default withStyles(styles)(Signup);
