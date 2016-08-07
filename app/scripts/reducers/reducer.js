import { combineReducers } from 'redux';
// import { reducer as formReducer } 'redux-form';

import { users } from './reducer_users.js';
import { items } from './reducer_items.js';

const rootReducer = combineReducers({
  items,
  users,
});

export default rootReducer;
