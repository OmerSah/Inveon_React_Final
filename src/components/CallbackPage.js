import * as React from 'react';
import { connect, useDispatch } from 'react-redux';
import userManager from './../userManager';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const CallbackPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const successCallback = (user) => {
        // get the user's previous location, passed during signinRedirect()
        const redirectPath = user.state.path;
        const userProfile = {
            name: user.profile.name,
            role: user.profile.role,
            email: user.profile.preferred_username
        }    
        dispatch({ type: "user/login", payload: { user: userProfile, status: true } })
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
