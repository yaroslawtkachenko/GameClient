import './SignForm.scss';
import {Link, Redirect} from 'react-router-dom';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {signIn} from '../../redux/actions/userActions';

class SignIn extends Component {
    constructor (props) {
        super(props);
    }
    handleClick = () => {
        let email = this.refs.email.value;
        let password = this.refs.password.value;
        this.props.signIn(email, password);
    };
    render () {
        const signInForm = <div className='sign-form-wrap'>
            <div className="sign-form">
                <strong>Sign in</strong>
                <input name='email' type="email" placeholder="Email" ref="email" defaultValue="testvlad@mail.com"/>
                <input type="password" placeholder="Password" ref="password" defaultValue="aa123456"/>
                <button onClick={this.handleClick}>Sign in</button>
                <p>Don`t have an account? <Link to="/sign_up">Sign up</Link></p>
            </div>
        </div>;
        return this.props.isSignedIn || this.props.isPending ? <Redirect to='/'/> : signInForm;
    }
}

SignIn.propsType = {
    signIn: PropTypes.func.isRequired,
    isSignedIn: PropTypes.bool.isRequired,
    isPending: PropTypes.bool.isRequired
};

function mapStateToProps (state) {
    return {
        isSignedIn: state.user.isSignedIn,
        isPending: state.user.isPending
    };
}

function mapDispatchToProps (dispatch) {
    return {
        signIn: (email, password) => dispatch(signIn(email, password))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
