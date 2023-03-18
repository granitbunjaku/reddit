import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

function Protected({ shouldBeLoggedin=true, children }) {

    const {isLoggedin} = useSelector(store => store.user)

    if ((shouldBeLoggedin && !isLoggedin) || (!shouldBeLoggedin && isLoggedin)) {
        console.log("hello")
        return <Navigate to="/" replace />
    }
    return children
}

export default Protected