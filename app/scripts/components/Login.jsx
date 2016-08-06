import React from 'react';
import { connect } from 'react-redux';

import NavBar from './NavBar.jsx';

import { checkUserLogin } from '../actions/userActions.js';


let Login = ({ dispatchLogin }) => {
  let username;
  let password;
  return (
    <div className="main_container">
      <NavBar />
      <h2>Login</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatchLogin(username.value, password.value);

          username.value = '';
          password.value = '';
        }}>

        <label htmlFor="username">username</label>
        <input ref={(node) => { username = node; }} required />

        <label htmlFor="password">password</label>
        <input ref={(node) => { password = node; }} required />

        <button type="submit">add</button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {

  };
};


const mapDispatchToProps = (dispatch) => {
  return {
    dispatchLogin: (user, pass) => {
      dispatch(checkUserLogin(user, pass));
    },
  };
};

Login = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

export default Login;
