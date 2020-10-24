import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Show from '../Show/show.js';
import * as actions from '../../reducers/auth';
import {Form,Button} from 'react-bootstrap';

const SignUP = (props) => {
  const state = {
    username: '',
    password: '',
    role: '',
  };

  const [redirect, setRedirect] = useState(false);

  const handleChange = e => {
    state[e.target.name] = e.target.value;
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.signup(state.username, state.password);
    setRedirect(true);

  };


  return (
    <>
      <Show condition={props.signedIn} >
        {(redirect === true) ? <Redirect to='/' /> : null}
      </Show>

      <Show condition={!props.signedIn}>

        <Form style={{ width: '20rem', marginLeft: '30px' , marginTop: '20px'}} onSubmit={handleSubmit}>
          <Form.Label> SIGN UP</Form.Label>
          <Form.Group controlId="formBasicEmail">
            <Form.Control
              style={{ marginBottom: '10px'}}
              placeholder="User Name"
              name="username"
              id='username'
              className='borderBu pFonts'
              type='text'
              onChange={handleChange}>
            </Form.Control>
            <Form.Control
              style={{ marginBottom: '10px'}}
              placeholder="Password"
              name="password"
              id='password'
              onChange={handleChange}
              type='password'
              className='borderBu pFonts'>
            </Form.Control>

            {/* <Form.Control
            style={{ marginBottom: '10px'}}
            placeholder="Role"
            name="role"
            type='text'
            onChange={handleChange}
            className='borderBu'>
          </Form.Control> */}

          </Form.Group>
          <Button variant="primary" type="submit">SIGN UP</Button>
          
        </Form>

      </Show>
    </>
  );


};

const mapStateToProps = (state) => {
  return {
    signedIn: state.auth.signedIn,
  };
};


const mapDispatchToProps = (dispatch, getState) => ({
  signup: (username, password) => dispatch(actions.signup(username, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUP);