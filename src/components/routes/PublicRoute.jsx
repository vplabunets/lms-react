/* eslint-disable react/prop-types */
import {useAuth} from '../../hooks/useAuth';
import React from 'react';
import {Navigate} from 'react-router-dom';
// import {useSelector} from "react-redux";

export const PublicRoute = ({component: Component, redirectTo = '/'}) => {
    const {isLoggedin} = useAuth();
       return isLoggedin ? <Navigate to={redirectTo}/> : <Component/>;
};