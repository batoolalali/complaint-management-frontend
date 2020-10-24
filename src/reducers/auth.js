import cookie from 'react-cookies';
import axios from 'axios';
import Cookies from 'universal-cookie';
const API = 'http://localhost:3030';
const cookies = new Cookies();

// STATE
const initialState = {
  signedIn: false,
  user: '',
  token: '',
};

// REDUCERS
export default (state = initialState, action) => {
  const { type, payload } = action;
  
  switch (type) {
  case 'signIn':
    return {...state, user:payload.user , signedIn: true, token: payload.token };
  
  case 'signout':
    cookie.save('auth', 'token',{ path: '/' });
    return initialState;

  default:
    console.log('defulat')
    return state;
  }
};

// ACTIONS
export const signup = (username, password) => {
  return async dispatch => {
    const options = {
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-cache',
    };
    let response = await axios.post(`${API}/signup`, { username, password }, options);
    await cookie.save('auth', response.data, { path: '/' });
    await dispatch(signIn({user: username, token: response.data}));
    cookies.set('user', username, { path: '/' });

  };  
};


export const login = (username, password)  => {
  return async dispatch =>{
    const options = {
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' ,'Authorization': `Basic ${btoa(`${username}:${password}` )}`},
      cache: 'no-cache',
    };
    let response = await axios.post(`${API}/signin`, {}, options);
    await cookie.save('auth', response.data, { path: '/' });
    console.log('username', username, 'token', response.data)
    await dispatch(signIn({user: username, token: response.data, }));  
    cookies.set('user', username, { path: '/' });

  };
};

export const signout = () => {
  return {
    type: 'signout',
    payload: 'payload',
  };
};

export const signIn = (obj) => { 
  return {
    type: 'signIn',
    payload: obj,
  };
};