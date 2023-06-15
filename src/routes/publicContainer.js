import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import Policy from "../pages/policy/policy";

export default function PublicContainer() {
  return (
    <>
        <Routes>
            <Route exact path="/policy" element={<Policy />} />
            <Route exact path="/*" element={<Navigate to="/home" />} />
        </Routes>
    </>
  )
}
