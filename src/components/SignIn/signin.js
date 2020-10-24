import React, { useState } from 'react';
import * as actions from '../../reducers/auth';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Show from '../Show/show.js';
import {Form,Button} from 'react-bootstrap';
import Signup from '../SignUp/signup.js';

const Login = (props) => {
  const state = {
    username: '',
    password: '',
  };
  console.log(props.signedIn)
  console.log('user',props.username)

  const [signup, setSignup] = useState(false);
  const [redirect, setRedirect] = useState(false);


  const handleChange = e => {
    console.log(e.target.value)
    state[e.target.name] = e.target.value;
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(state.username, state.password)
    props.login(state.username, state.password);
    setRedirect(true);
  };



  return (
    <>
      <Show condition={props.signedIn} >
        {(redirect === true) ? <Redirect to='/' /> : null}
      </Show>

      <div className='back'>
        
        <div className='sign'>

          <Show condition={!props.signedIn && !signup}>

            <Form style={{ width: '20rem', marginLeft: '30px' , marginTop: '20px'}} onSubmit={handleSubmit}>
              <Form.Label> SIGN IN</Form.Label>
              <Form.Group controlId="formBasicEmail">
                <Form.Control
                  style={{ marginBottom: '10px'}}
                  placeholder="User Name"
                  name="username"
                  id='username'
                  className='pFonts borderBu '
                  type='text'
                  onChange={handleChange}>
                </Form.Control>
                <Form.Control
                  style={{ marginBottom: '10px'}}
                  placeholder="Password"
                  name="password"
                  id='password'
                  className='pFonts borderBu'
                  type='password'
                  onChange={handleChange}>
                </Form.Control>
              </Form.Group>
              <Button variant="primary" type="submit">SIGN IN</Button>
              <p className='newUser pFonts' >New User ? <Link onClick={() => { setSignup(true); }}  >Register </Link></p>
            </Form>
            
          </Show>

          <Show condition={!props.signedIn && signup}>
            <Signup />
            <Link style={{ marginLeft: '20px'}} id='goBackBtn ' className="btn pulse backsize" onClick={() => { setSignup(false); }}  > Go Back </Link>
          </Show>
        </div>
      </div>

    </>
  );


};
const mapStateToProps = (state) => {
  return {
    signedIn: state.auth.signedIn,
    username: state.auth.user
  };
};

const mapDispatchToProps = (dispatch, getState) => ({
  login: (username, password) => dispatch(actions.login(username, password)),
  signout: () => dispatch(actions.signout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);