import React from 'react';

import NavBar from './NavBar.jsx';

import { createUser } from '../actions/userActions.js';

const Signup = () => {
  let username;
  let password;
  let confirm;
  let email;
  let zip;

  return (
    <div className="main_container">
      <NavBar />
      <h2>Signup</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          if (password.value !== confirm.value) {
            console.log('passwords do not match');
            return;
          }
          createUser(username.value, password.value, email.value, zip.value);
        }}>

        <label htmlFor="username">username</label>
        <input ref={(node) => { username = node; }} required />

        <label htmlFor="password">password</label>
        <input ref={(node) => { password = node; }} required />

        <label htmlFor="confirm">password confirm</label>
        <input ref={(node) => { confirm = node; }} required />

        <label htmlFor="email">email</label>
        <input ref={(node) => { email = node; }} required />

        <label htmlFor="zip">zip code</label>
        <input ref={(node) => { zip = node; }} required />

        <button type="submit">create</button>
      </form>
    </div>
  );
};

module.exports = Signup;
