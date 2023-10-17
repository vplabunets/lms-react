/* eslint-disable react/prop-types */
import React from 'react';
import {useAuth} from '../../hooks/useAuth';
import {Navigate} from 'react-router-dom';



export const PrivateRoute = ({component: Component, redirectTo = '/'}) => {
     const {isLoggedin} = useAuth();

    return !isLoggedin ? <Navigate to={redirectTo}/> : <Component/>;
};
