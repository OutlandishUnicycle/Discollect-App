import { combineReducers } from 'redux';

const initUserState = {
  zip: null,
  id: null,
  username: null,
  password: null,
};

const users = (state = initUserState, action) => {
  switch (action.type) {
    case 'LOGIN_VALID':
      return Object.assign({}, state, {
        zip: action.zip,
        id: action.id,
        username: action.username,
      });
    case 'ID_USER':
      return Object.assign({}, state, {
        username: action.username,
        password: action.password,
      });
    default:
      return state;
  }
};

const initItemState = {
  items: [],
};

const items = (state = initItemState, action) => {
  switch (action.type) {
    case 'GET_INITIAL_ITEMS':
      return Object.assign({}, state, {
        items: action.items,
      });
    default:
      return state;
  }
};

const search = (state = {}, action) => {
  switch (action.type) {
    case 'SUBMIT_SEARCH':
      return Object.assign({}, state, {
        keywords: action.keywords,
        category: action.category,
        zip: action.zip,
      });
    default:
      return state;
  }
};

const initUserListingsState = {
  userListings: [],
};

const userListings = (state = initUserListingsState, action) => {
  switch (action.type) {
    case 'GET_USERS_LISTINGS':
      return Object.assign({}, state, {
        userListings: action.userListings,
      });
    default:
      return state;
  }
};

const initUserIDState = {
  userID: null,
};

const userID = (state = initUserIDState, action) => {
  switch (action.type) {
    case 'SAVE_USER_ID':
      return Object.assign({}, state, {
        userID: action.userID,
      });
    default:
      return state;
  }
};

const userCoords = (state = [0, 0], action) => {
  switch (action.type) {
    case 'GET_USER_COORDS':
      // console.log(action.payload);
      return [action.payload.coords.longitude, action.payload.coords.latitude];
    default:
      return state;
  }
};

const reducer = combineReducers({
  items,
  users,
  search,
  userListings,
  userID,
  userCoords,
});

module.exports = {
  reducer,
};
