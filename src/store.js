import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';


import auth from './reducers/auth.js';
import role from './reducers/role.js';
// import compliant from './reducers/complaint.js'




const reducers = combineReducers({  auth, role});

const store = () => {
  return createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));
};

export default store();