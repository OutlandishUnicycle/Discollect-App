import React from 'react';
import { connect } from 'react-redux';

import NavBar from './NavBar.jsx';

import { checkUserLogin } from '../actions/userActions.js';


const Login = ({ dispatchLogin }) => {
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
          console.log(username.value);
          console.log(password.value);
        }}
      >

        <label htmlFor="username">username</label>
        <input ref={(node) => { username = node; }} id="username" />

        <label htmlFor="password">password</label>
        <input ref={(node) => { password = node; }} id="password" />

        <button type="submit">add</button>
      </form>
    </div>
  );
};

Login.propTypes = {
  dispatchLogin: React.PropTypes.func,
};

// const mapStateToProps = (state) => {
//   return {

//   };
// };


const mapDispatchToProps = (dispatch) => (
  {
    dispatchLogin: (user, pass) => {
      dispatch(checkUserLogin(user, pass));
    },
  }
);

export default connect(null, mapDispatchToProps)(Login);
