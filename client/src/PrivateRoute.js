import React, {Component } from 'react';
import {Route,Redirect } from 'react-router-dom';
import auth from './auth-helpers.js';

const PrivateRoute= ({conponent: Component,...rest})=>(
    <Route {...rest} render={props=>(
        auth.isAuthenticated ? (
            <Component {...props}/>
        ): (
            <Redirect 
            to={{
                pathname: '/users/signin',
                state: {from: props.location}
            }}
            />
        )
    )}/>
);

export default PrivateRoute;