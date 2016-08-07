import React from 'react';
import NavBar from './NavBar.jsx';

const App = (props) => (
  <main className="outer_container">
    <NavBar />
    { props.children }
  </main>
);

export default App;
