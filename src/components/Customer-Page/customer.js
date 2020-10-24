import React, { Component } from 'react';
import { Route, useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import cookie from 'react-cookies';
import { connect } from 'react-redux';
import * as actions from '../../reducers/role.js';
import ComplaintForm from '../Complaint-Form/complaint-form.js'


let theUser, token;

class CustomerPage extends Component {
    componentWillMount() {
        const cookieToken = cookie.load('auth');
        token = cookieToken || null;
        const userPro = cookie.load('user');
        theUser = userPro || null;
        this.props.getUserComplaints(theUser, token);
    }

    render() {
        let complaints;
        if (this.props.userComplaints != []) {
            complaints = this.props.userComplaints.map((complaint, index) => (
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
                    </Card.Body>
                </Card>
            ));
        }

        return (
            <div>
                {complaints}
                <ComplaintForm/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        userComplaints: state.role.userComplaints,
    }
};

const mapDispatchToProps = (dispatch, getState) => ({
    getUserComplaints: (userName, token) => dispatch(actions.getUserComplaints(userName, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomerPage);