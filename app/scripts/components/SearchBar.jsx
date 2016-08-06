import React from 'react';
import { connect } from 'react-redux';

import itemActions from '../actions/itemActions.js';


const SearchBar = ({ commitSearch }) => {
  let search;
  return (
    <div className="search_bar">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log('abcdef', search.value)
          commitSearch(search.value);
        }} >
        <input className="search_bar_input" ref={(node) => { search = node }}/>
        <button>search</button>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    commitSearch: (query) => {
      dispatch(itemActions.searchItem(query));
    }
  };
};

const mapStateToProps = (state) => {
  return {

  };
};



export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
