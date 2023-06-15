import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from '../pages/auth/login'
import Register from '../pages/auth/register'
import Policy from "../pages/policy/policy";

export default function PublicContainer() {
  return (
    <>
        <Routes>
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/policy" element={<Policy />} />
            <Route exact path="/*" element={<Navigate to="/home" />} />
        </Routes>
    </>
  )
}
