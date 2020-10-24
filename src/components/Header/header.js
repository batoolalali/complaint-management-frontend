import React, { Component } from 'react';
import Nav from 'react-bootstrap/Nav';
import Show from '../Show/show.js';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../reducers/auth.js';
import './header.css'

class header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signedIn: true,
        };
    }

    render() {
        console.log('singedIn', this.props.signedIn)
        return (
            <>

                <Nav style={{ height: '50px', marginBottom: '25px', paddingLeft: '10px', alignItems: 'center' }} variant="tabs" defaultActiveKey="/home">
                    <Nav.Item>
                        <Link to="/">Home</Link>
                    </Nav.Item>
                    <Show condition={this.props.signedIn}>
                        <Nav.Item>
                            <Link to='/customer'> My Complaints</Link>
                        </Nav.Item>
                    </Show>
                    <Show condition={this.props.signedIn}>
                        <Nav.Item>
                            <Link to="/admins">All Complaints</Link>
                        </Nav.Item>
                    </Show>
                    <Show condition={!this.props.signedIn}>
                        <Nav.Item>
                            <Link to="/signin" >SIGN IN</Link>
                        </Nav.Item>
                    </Show>

                    <Show condition={this.props.signedIn}>
                        <Nav.Item>
                            <Link to='/'>
                                <span
                                    onClick={() => { this.props.signout(); }} >
                                    Sign Out
                            </span>
                            </Link>
                        </Nav.Item>

                    </Show>
                </Nav>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        signedIn: state.auth.signedIn,
        user: state.auth.user,
        token: state.auth.token,
    };
};

const mapDispatchToProps = (dispatch, getState) => ({
    signout: () => dispatch(actions.signout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(header);