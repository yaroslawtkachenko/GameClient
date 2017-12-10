import './App.scss';
import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {validateToken} from '../../redux/actions/userActions';
import Window from '../Window/Window';
import {withRouter} from 'react-router-dom';

class App extends Component {
    constructor (props) {
        super(props);
    }
    componentWillMount () {
        this.props.validateToken();
    }
    render () {
        return (
            <div className='App'>
                <Window/>
            </div>
        );
    }
}

App.propTypes = {
    isSignedIn: PropTypes.bool.isRequired,
    validateToken: PropTypes.func.isRequired
};

App.defaultProps = {
    isSignedIn: false
};

function mapStateToProps (state) {
    return {
        isSignedIn: state.user.isSignedIn
    };
}

function mapDispatchToProps (dispatch) {
    return {
        validateToken: () => dispatch(validateToken())
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
