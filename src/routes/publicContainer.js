import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from '../pages/auth/login'
import Register from '../pages/auth/register'

export default function PublicContainer() {
  return (
    <>
        <Routes>
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/*" element={<Navigate to="/home" />} />
        </Routes>
    </>
  )
}
