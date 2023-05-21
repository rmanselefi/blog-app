import './App.css';
import Blogs from './components/blog/blogs';
import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Routes } from 'react-router';
import Login from './components/auth/login';
import Signup from './components/auth/signup';
import PrivateRoute from './components/privateroute/private_route';

function App() {
  return (
    <div className="App">
      <Router>
        <Fragment>
          <Routes>
            <Route exact path="/" element={<Login />}></Route>
            <Route exact path="/signup" element={<Signup />}></Route>
            <Route element={<PrivateRoute />}>
              <Route path="/blogs" element={<Blogs />} />
            </Route>
          </Routes>
        </Fragment>
      </Router>
    </div>
  );
}

export default App;
