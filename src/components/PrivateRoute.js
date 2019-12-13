import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { userContext } from '../context/UserContext';

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <userContext.Consumer>
        {
            user =>
                <Route {...rest} render={props => {
                    if (!user.isAuthenticated) {
                        // not logged in so redirect to login page with the return url
                        return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
                    }
                    // authorised so return component
                    return <Component {...props} />
                }} />
        }
    </userContext.Consumer>
)

export default PrivateRoute;
