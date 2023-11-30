import * as React from 'react';
import { connect, useDispatch } from 'react-redux';
import userManager from './../userManager';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { getFavorites, getUserCart } from '../app/slices/product';
import axios from 'axios';

const CallbackPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const successCallback = (user) => {
        // get the user's previous location, passed during signinRedirect()
        const redirectPath = user.state.path;
        dispatch({ type: "user/login", payload: { user: user, status: true } })
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + user.access_token;
        dispatch(getUserCart(user.profile.sub))
        dispatch(getFavorites(user.profile.sub))
        navigate(redirectPath);
    };

    const errorCallback = (error) => {
        console.log(error);
        navigate('/');
    };

    useEffect(() => {
        userManager
            .signinRedirectCallback()
            .then(user => successCallback(user))
            .catch(error => errorCallback(error));
    });

    return <div>Loading...</div>;
};

export default connect()(CallbackPage);
