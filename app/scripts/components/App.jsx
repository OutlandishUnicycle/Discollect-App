import React from 'react';
import NavBar from './NavBar.jsx';

const App = (props) => (
  <main className="outer_container">
    <NavBar />
    { props.children }
  </main>
);

App.propTypes = {
  children: React.PropTypes.object,
};

export default App;
