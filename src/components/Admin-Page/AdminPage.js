import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { connect } from 'react-redux';
import * as actions from '../../reducers/role.js';
import cookie from 'react-cookies';
import './adminPage.css'
let theUser,token;
class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
  
    };
  }

  componentWillMount() {
    const cookieToken = cookie.load('auth');
    token = cookieToken || null;
    const userPro = cookie.load('user');
    theUser = userPro || null;
    console.log('user', theUser)
    this.props.getAllAdmin(token);
    // this.props.getAllComplaints(token);

    console.log('token', token);
  }
  componentDidMount(){
    this.props.getAllComplaints(token);
  }

  handleChange = e => {
    this.setState({status:e.target.value}) ;
  }

  handleSubmit = (id ) => {
    // e.preventDefault();
    console.log('-id', id)
    this.props.editComplaint(id,this.state.status, token); ///
  };


  render() {
    let names = []
    const complaints = this.props.complaints.map((complaint, index) => (
      <Card style={{ width: '25rem', marginBottom: '25px', marginLeft: '60px' }} key={complaint._id}>
        <Card.Body>
          <Card.Title className={`${complaint.status}`}><span className='status'>{complaint.status} </span> <span className='type'>{complaint.type}</span></Card.Title>
          <Card.Text>
            {complaint.description}
          </Card.Text>
          <p>
            {complaint.userName}
          </p>
          <p>{complaint.userContact}</p>
            <Form key={index} onSubmit={()=>(this.handleSubmit(complaint._id))}>
              <span>Edit Status</span>
              <Form.Control size="sm" type="text" placeholder="Status" name='status' onChange={this.handleChange} style={{ marginBottom: '10px' }} />
              <Button variant="primary" type="submit" >Edit Status</Button>
            </Form>
        </Card.Body>
      </Card>
    ));
    this.props.admins.map(admin => (
      names.push(admin.username)
    ));
    if (names.includes(theUser))
      return (
        <div>
          {complaints}
        </div>
      );
    else return (
      <div>
        <p>Access Denied!</p>
      </div>
    );
  }
}


const mapStateToProps = state => {
  console.log(state.role.complaints, "state.role.complaints")
  return{
  admins: state.role.admins,
  complaints: state.role.complaints,
}};

const mapDispatchToProps = (dispatch, getState) => ({
  getAllAdmin: (token) => dispatch(actions.getAllAdmin(token)),
  getAllComplaints: (token) => dispatch(actions.getAllComplaints(token)),
  editComplaint:(id, newRecord, token) => dispatch(actions.editComplaint(id, newRecord,token))
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);