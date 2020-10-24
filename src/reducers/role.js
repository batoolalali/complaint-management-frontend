import axios from 'axios';
const API = 'http://localhost:3030';

// STATE
const initialState = {
  admins: [],
  complaints: [],
  userComplaints:[],
};


// REDUCERS
export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'GetAdmins':
      return { ...state, admins: payload.results };
    case 'GetComplaints':
      console.log(action, 'hhh')
      return { ...state, complaints: payload.results };
    case 'EDIT Complaint':
      let complaints = state.adminPage.map((status) =>
        status._id === payload._id ? payload : status);
      return { ...state, complaints: complaints };
    case 'GetUserComplaint':
      return { ...state, userComplaints: payload.results };
    case 'Add Complaint':
      return {...state, complaints: payload.results || {}};
    default:
      return state;
  }
};


//Action

export const getAllAdmin = (token) => dispatch => {
  const options = {
    mode: 'cors',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    cache: 'no-cache',
  };
  axios.get(`${API}/users`, options)
    .then(res => {
      let admins = res.data.filter(user => user.role === 'admin' ? true : false);
      console.log(admins, 'reducer');
      dispatch(getAllAdminAction({ results: admins }));
    })
    .catch(e => {
      console.error();
    });
};

export const getAllAdminAction = (payload) => {
  console.log()
  return {
    type: 'GetAdmins',
    payload: payload,
  };
};

export const getAllComplaints = (token) => dispatch => {
  const options = {
    mode: 'cors',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    cache: 'no-cache',
  };
  axios.get(`${API}/api/v1/complaint`, options)
    .then(res => {
      console.log('comps', res.data.results);
      dispatch(getAllComplaintsAction({ results: res.data.results }));
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

export const editComplaint = (id, newRecode, token) => dispatch => {
  const options = {
    mode: 'cors',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    cache: 'no-cache',
  };
 let record={status :newRecode}
 console.log('id', id)
 console.log("record", record );
  axios.patch(`${API}/api/v1/complaint/${id}`, record, options)
    .then(res => {
      dispatch(editComplaintAction(res.data));
    })
    .catch(e => {
      console.error();
    });
};

export const editComplaintAction = (payload) => {
  return {
    type: 'EDIT Complaint',
    payload: payload,
  };
};


export const getUserComplaints = (userName,token) => dispatch => {
  const options = {
    mode: 'cors',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    cache: 'no-cache',
  };
  axios.get(`${API}/api/v1/complaint/${userName}`, options)
    .then(res => {
      console.log('gett', res.data)
      dispatch(getUserComplaintsAction({ results: res.data }));
    })
    .catch(e => {
      console.error();
    });
};

export const getUserComplaintsAction = (payload) => {
  return {
    type: 'GetUserComplaint',
    payload: payload,
  };
};

export const addComplaint = (newComplaint,token) => dispatch => {
  const options = {
    mode: 'cors',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    cache: 'no-cache',
  };
  axios.post(`${API}/api/v1/complaint/`, newComplaint,options)
    .then(res => {
      console.log(res.data)
      dispatch(addComplaintAction(res.data));
    })
    .catch(e => {
      console.error();
    });
};

export const addComplaintAction = (payload) => {
  console.log()
  return {
    type: 'Add Complaint',
    payload: payload,
  };
};