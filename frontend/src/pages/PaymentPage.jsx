import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentPage = () => {
    const [loading, setLoading] = useState(false);

    const location = useLocation();

    if (!location.state) return null;
    const { totalCost, title } = location.state;
    const [paymentData, setPaymentData] = useState({
        cardNumber: "",
        cardholderName: "",
        expiryDate: "",
        cvv: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPaymentData({ ...paymentData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const res = await fetch("http://localhost:5000/api/tickets", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...location.state.ticketData,
            }),
        });
        const data = await res.json();
        if (res.ok) {
            alert("Payment successful. Ticket booked !");
            navigate("/");
        } else {
            alert("Payment failed. Please try again.");
            console.log(data);
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-200 p-6">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4">Payment Details</h2>
                <p className="text-lg mb-4">Museum : {title}</p>
                <p className="text-lg mb-4">Total Cost: ₹{totalCost}</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700">
                            Card Number
                        </label>
                        <input
                            type="text"
                            name="cardNumber"
                            value={paymentData.cardNumber}
                            onChange={handleChange}
                            required
                            className="w-full p-2 rounded bg-gray-100 border border-gray-300"
                            placeholder="1234 5678 9123 4567"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">
                            Cardholder Name
                        </label>
                        <input
                            type="text"
                            name="cardholderName"
                            value={paymentData.cardholderName}
                            onChange={handleChange}
                            required
                            className="w-full p-2 rounded bg-gray-100 border border-gray-300"
                            placeholder="John Doe"
                        />
                    </div>
                    <div className="flex space-x-4">
                        <div>
                            <label className="block text-gray-700">
                                Expiry Date
                            </label>
                            <input
                                type="text"
                                name="expiryDate"
                                value={paymentData.expiryDate}
                                onChange={handleChange}
                                required
                                className="w-full p-2 rounded bg-gray-100 border border-gray-300"
                                placeholder="MM/YY"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">CVV</label>
                            <input
                                type="text"
                                name="cvv"
                                value={paymentData.cvv}
                                onChange={handleChange}
                                required
                                className="w-full p-2 rounded bg-gray-100 border border-gray-300"
                                placeholder="123"
                            />
                        </div>
                    </div>
                    <div className="text-right">
                        <button
                            type="submit"
                            className={`bg-blue-600 text-white py-2 px-4 rounded ${
                                loading ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                        >
                            {loading ? "Processing..." : "Pay Now"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PaymentPage;
