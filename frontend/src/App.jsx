import React from "react";
import Navbar from "./components/Navabar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PaymentPage from "./pages/PaymentPage";

const App = () => {
    return (
        <div className="bg-gray-900 min-h-screen w-full font-main">
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/payment" element={<PaymentPage />} />
            </Routes>
        </div>
    );
};

export default App;
