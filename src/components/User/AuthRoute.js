import {
    Route,
    Redirect
} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import {validateToken} from '../../redux/actions/userActions';

class AuthRoute extends React.Component {
    render () {
        const { component: Component, isSignedIn, isPending, ...rest } = this.props;
        return (
            <Route {...rest} render={
                props => {
                    const loadingPage = <div>Loading...</div>;
                    return (
                        isPending ? loadingPage
                            : isSignedIn
                                ? <Component {...props} />
                                : <Redirect to="/sign_in" />
                    );
                }
            } />
        );
    }
}

AuthRoute.propsType = {
    isSignedIn: PropTypes.bool.isRequired,
    isPending: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
    isSignedIn: state.user.isSignedIn,
    isPending: state.user.isPending
});

function mapDispatchToProps (dispatch) {
    return {
        validateToken: () => dispatch(validateToken())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthRoute);
