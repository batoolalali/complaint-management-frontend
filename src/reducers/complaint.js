import axios from 'axios';
const API = 'http://localhost:3030';

// STATE
const initialState = {
    complaints:[]
  };
  

// REDUCERS
export default (state = initialState, action) => {
    const { type, payload } = action;
    
    switch (type) {
    case 'GetComplaints':
        return {...state , admins: payload.results};

    default:
      return state;
    }
  };


//Action

  export const getAllComplaints = (token) => dispatch => {
    const options = {
      mode: 'cors',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      cache: 'no-cache',
    };
    axios.get(`${API}/api/v1/complaint`, options)
      .then(res => {
          console.log('comps',res.data);
        dispatch(getAllAdminAction( {results:res.data})); 
      })
      .catch(e => {
        console.error();
      });
  };
  
  export const getAllComplaintsAction = (payload) => {
    return {
      type: 'GetComplaints',
      payload: payload,
    };
  };
  