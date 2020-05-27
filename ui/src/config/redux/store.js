import { createStore, applyMiddleware, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

// ******** Own reducers **************
import spaces from "../../reducers/spaces";
import auth from "../../reducers/auth";
import global from '../../reducers/global';
import users from "../../reducers/users";
import notifications from '../../reducers/notifications';


export const rootReducer = combineReducers({
  // own reducers
  global,
  spaces,
  auth,
  users,
  notifications,

  // dependencies reducers
  form: formReducer,
});

export const initializeStore = (initialState = {}) => {

  return createStore(
    rootReducer,
    initialState,
    composeWithDevTools(
      applyMiddleware(
        thunkMiddleware,
        // routerMiddleware,
      ),
    ),
  );
};

