import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/home/home";
import Navbar from "../partials/navbar";
import Contact from "../pages/home/contact";
import AboutUs from "../pages/home/aboutUs";
import CartDetail from "../pages/cart/cartDetail";
import Appointments from "../pages/appointment/appointment";
import JwtHelper from "../helpers/jwtHelper";
import MeetDetail from "../pages/meet/meetDetail";
import DoctorDetail from "../pages/doctor/doctorDetail";
import Doctors from "../pages/doctor/doctors";
import Meets from "../pages/meet/meet";
import MeetDetil from "../pages/meet/meetDetail";


export default function HomeContainer() {
    const isAuthentication = new JwtHelper().verifyAccessToken();
    return (
        <>
            <Navbar />
            <div className="container">
                <Routes>
                    {isAuthentication && (
                        <>
                            <Route exact path="/cartdetail" element={<CartDetail />} />
                            <Route exact path="/appointments/:id" element={<Appointments />} />
                            <Route exact path="/meets/:id" element={<Meets />} />
                            <Route exact path="/meetdetail/:id" element={<MeetDetil />} />
                        </>
                    )}
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/contact" element={<Contact />} />
                    <Route exact path="/meetdetail/:id" element={<MeetDetail />} />
                    <Route exact path="/aboutus" element={<AboutUs />} />
                    <Route exact path="/doctors" element={<Doctors />} />
                    <Route exact path="/doctors/:id" element={<DoctorDetail />} />
                    <Route exact path="/*" element={<Navigate to="/" />} />
                </Routes>
            </div>
        </>
    );
}
