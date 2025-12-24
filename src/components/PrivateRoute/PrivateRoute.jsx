import { jwtDecode } from 'jwt-decode'
import React from 'react'
import { Navigate } from 'react-router-dom'

function PrivateRoute({ children, role }) {
    let token = localStorage.getItem("token")

    if (!token) return <Navigate to={"/"}  />
    let decoded;
    try {
        decoded = jwtDecode(token);
    } catch {
        localStorage.removeItem("token")
        return <Navigate to={"/login"}  />
    }

    if (decoded.role != role) {
        return <Navigate to={"/login"}  />
    }

    return children
}

export default PrivateRoute