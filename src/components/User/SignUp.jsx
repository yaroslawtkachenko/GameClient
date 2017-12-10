import './SignForm.scss';
import {Link, Redirect} from 'react-router-dom';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {signUp} from '../../redux/actions/userActions';

class SignUp extends Component {
    constructor (props) {
        super(props);
    }
    handleClick = () => {
        let email = this.refs.email.value;
        let password = this.refs.password.value;
        let passwordConfirmation = this.refs.pc.value;
        this.props.signUp(email, password, passwordConfirmation);
    };
    render () {
        const signUpFrom = <div className='sign-form-wrap'>
            <div className="sign-form">
                <strong>Sign up</strong>
                <input name='email' type="email" placeholder="Email" ref="email"/>
                <input type="password" placeholder="Password" ref="password"/>
                <input type="password" placeholder="Confirm password" ref="pc"/>
                <button onClick={this.handleClick}>Sign up</button>
                <p>Already account? <Link to="/sign_in">Sign in</Link></p>
            </div>
        </div>;
        return this.props.isSignedIn || this.props.isPending ? <Redirect to='/' /> : signUpFrom;
    }
}

SignUp.propsType = {
    signUp: PropTypes.func.isRequired,
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
        signUp: (email, password, passwordConfirmation) => dispatch(signUp(email, password, passwordConfirmation))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
