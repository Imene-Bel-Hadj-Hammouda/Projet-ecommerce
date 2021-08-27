import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { selectisauth, selectuser } from '../features/users/usersSlice';

const PrivateRoute = ({ component: Component, roles, ...rest }) => {
    // const { isAuthenticated, user} = useContext(AuthContext);
    const isauth = useSelector(selectisauth)
    const user = useSelector(selectuser)

    return (
        <Route {...rest} render={props => {
            if (!isauth)
                return <Redirect to={{
                    pathname: '/login',
                    state: { from: props.location }
                }} />

            if (!roles.includes(user.__t))
                return <Redirect to={{
                    pathname: '/',
                    state: { from: props.location }
                }} />
            return <Component {...props} />
        }} />
    )
}

export default PrivateRoute;