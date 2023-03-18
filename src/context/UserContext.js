import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { CircleLoader } from 'react-spinners';
import { getUser } from '../slices/userSlice';

export const uContext = React.createContext({});

export const UserContext = (props) => {
    const {isLoading} = useSelector((store) => store.user)
    const dispatch = useDispatch()
    
  
    useEffect(() => {
        dispatch(getUser())
    }, [])

    if (isLoading) {
        return <CircleLoader className="loading" color="#ff4500" />;
    }

    return (
        <div>
            {props.children}
        </div>
    )
}
