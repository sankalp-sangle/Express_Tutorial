import React from 'react';
import Navigationbar from './Navigationbar';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom'

function Settings () {
    const user_id = useLocation().state.id;
    const dispatch = useDispatch();
    console.log(user_id);
    return (
        <div>
            <Navigationbar id={user_id}/>
            <h1>Settings</h1>
        </div>
    );
}

export default Settings;