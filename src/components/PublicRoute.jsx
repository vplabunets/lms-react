/* eslint-disable react/prop-types */
import {useAuth} from '../hooks/useAuth';
import React from 'react';
import {Navigate} from 'react-router-dom';

export const PublicRoute = ({component: Component, redirectTo = '/'}) => {
    const {isLoggedIn} = useAuth();
    console.log(isLoggedIn)
    return isLoggedIn ? <Navigate to={redirectTo}/> : <Component/>;
};