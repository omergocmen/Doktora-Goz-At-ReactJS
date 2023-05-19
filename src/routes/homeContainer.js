import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/home/home";
import Navbar from "../partials/navbar";
import Contact from "../pages/home/contact";
import AboutUs from "../pages/home/aboutUs";
import CartDetail from "../pages/cart/cartDetail";
import Order from "../pages/order/order";
import JwtHelper from "../helpers/jwtHelper";
import Meet from "../pages/meet";
import DoctorDetail from "../pages/doctor/doctorDetail";
import Doctors from "../pages/doctor/doctors";

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
                            <Route exact path="/orders" element={<Order />} />
                        </>
                    )}
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/contact" element={<Contact />} />
                    <Route exact path="/meet/:id" element={<Meet />} />
                    <Route exact path="/aboutus" element={<AboutUs />} />
                    <Route exact path="/doctors" element={<Doctors />} />
                    <Route exact path="/doctors/:id" element={<DoctorDetail />} />
                    <Route exact path="/*" element={<Navigate to="/" />} />
                </Routes>
            </div>
        </>
    );
}
