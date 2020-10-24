import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import * as actions from '../../reducers/role.js';
import { connect } from 'react-redux';
import cookie from 'react-cookies';

let theUser, token;

class complaintForm extends Component {
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
    }

    handleChange = e => {
        this.setState({ ...this.state, [e.target.name]: e.target.value });
    };

    handleSubmit = async e => {
        e.preventDefault();
        let complaint = { userName: this.state.userName, type: this.state.type, userContact: this.state.userContact, description: this.state.description }
        await this.props.addComplaint(complaint, token);
    };

    render() {
        return (
            <div>
                <Form
                    style={{ width: '50rem', marginLeft: '30px', marginTop: '20px' }}
                    className='login formStyle zIndex'
                    onSubmit={this.handleSubmit} >
                    <Form.Label> ADD complaint </Form.Label>
                    <Form.Control
                        style={{ marginBottom: '10px' }}
                        placeholder='User Name'
                        name='userName'
                        type='text'
                        onChange={this.handleChange}
                        value={this.state.userName}
                        className='borderBu'
                    />
                    <Form.Control
                        style={{ marginBottom: '10px' }}
                        placeholder='Your Contact'
                        name='userContact'
                        type='text'
                        onChange={this.handleChange}
                        value={this.state.userContact}
                        className='borderBu'
                    />
                    <Form.Control as="textarea" rows="3"
                        style={{ marginBottom: '10px' }}
                        placeholder='description'
                        name="description"
                        onChange={this.handleChange}
                        value={this.state.description}
                        className='borderBu' />

                    <select class="custom-select" id="inputGroupSelect01"
                        name="type"
                        onChange={this.handleChange}>
                        <option selected>Type</option>
                        <option
                            value='product'>
                            product
                                </option>
                        <option value='service'>
                            service
                                </option>
                    </select>

                    <Button style={{ marginTop: '20px' }} variant="primary" type="submit"> ADD</Button>
                </Form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        complaints: state.role.complaints,
    }
};

const mapDispatchToProps = (dispatch, getState) => ({
    addComplaint: (newComplaint, token) => dispatch(actions.addComplaint(newComplaint, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(complaintForm);