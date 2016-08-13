import React from 'react';
import { connect } from 'react-redux';


import { createUser } from '../actions/userActions.js';

const Signup = ({ dispatchSignup }) => {
  let username;
  let password;
  let confirm;
  let email;
  let zip;
  return (
    <div className="main_container">
      <div className="signup_container">
        <h1>Signup</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!username.value.trim() &&
                !password.value.trim() &&
                !email.value.trim()) {
              return;
            }

            if (password.value !== confirm.value) {
              console.log('passwords do not match');
              return;
            }
            dispatchSignup(username.value, password.value, email.value, zip.value);

            username.value = '';
            password.value = '';
            confirm.value = '';
            email.value = '';
            zip.value = '';
          }}
        >
          <div className="auth_input">
            <label htmlFor="username">username</label>
            <input ref={(node) => { username = node; }} id="username" type="text" required />
          </div>
          <div className="auth_input">
            <label htmlFor="password1">password</label>
            <input ref={(node) => { password = node; }} id="password1" type="password" required />
          </div>
          <div className="auth_input">
            <label htmlFor="password2">confirm password</label>
            <input ref={(node) => { confirm = node; }} id="password2" type="password" required />
          </div>
          <div className="auth_input">
            <label htmlFor="email">email</label>
            <input ref={(node) => { email = node; }} id="email" type="email" required />
          </div>
          <div className="auth_input">
            <label htmlFor="zip">zip code</label>
            <input ref={(node) => { zip = node; }} id="zip" required />
          </div>
          <button type="submit" className="form_submit_button">create</button>
        </form>
      </div>
    </div>
  );
};

Signup.propTypes = {
  dispatchSignup: React.PropTypes.func,
};

const mapDispatchToProps = (dispatch) => (
  {
    dispatchSignup: (username, password, email, zip) => {
      dispatch(createUser(username, password, email, zip));
    },
  }
);

export default connect(null, mapDispatchToProps)(Signup);
