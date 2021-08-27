import React from 'react'
import { useSelector } from 'react-redux'
import { selectisauth } from '../features/users/usersSlice'
import { Route, Redirect } from 'react-router-dom';

function PublicRoute({ component: Component, restricted, ...rest }) {

    const isauth = useSelector(selectisauth)

    return (
        <Route {...rest} render={props => (
            isauth && restricted ?
                <Redirect to="/" />
                : <Component {...props} />
        )} />
    )
}

export default PublicRoute
