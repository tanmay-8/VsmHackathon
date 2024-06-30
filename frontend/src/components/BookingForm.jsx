import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BookingForm = ({ museum, isOpen, setIsOpen }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        confirmEmail: "",
        visitDate: "",
        numberOfChildren: "",
        numberOfMales: "",
        numberOfFemales: "",
        totalCharges:5000
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const navigate = useNavigate();
    const handleSubmit = (e) => {
        navigate("/payment", {
            state: {
                totalCost: 5000,
                title: museum.name,
                ticketData: formData,
            },
        });
    };
    if (!museum) return null;

    return (
        <div
            className={`z-50 min-h-screen w-[90vw] lg:w-[50vw] bg-gray-800 fixed top-0 left-0 p-6 ${
                !isOpen ? "-translate-x-[150%]" : ""
            } transition-all`}
        >
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl text-white">{museum.name}</h2>
                <button
                    onClick={() => setIsOpen(false)}
                    className="text-white text-3xl"
                >
                    &times;
                </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                    <label className="block text-gray-300">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full p-2 rounded bg-gray-700 text-white"
                    />
                </div>
                <div>
                    <label className="block text-gray-300">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full p-2 rounded bg-gray-700 text-white"
                    />
                </div>
                <div>
                    <label className="block text-gray-300">Confirm Email</label>
                    <input
                        type="email"
                        name="confirmEmail"
                        value={formData.confirmEmail}
                        onChange={handleChange}
                        required
                        className="w-full p-2 rounded bg-gray-700 text-white"
                    />
                </div>
                <div>
                    <label className="block text-gray-300">Visit Date</label>
                    <input
                        type="date"
                        name="visitDate"
                        value={formData.visitDate}
                        onChange={handleChange}
                        required
                        className="w-full p-2 rounded bg-gray-700 text-white"
                    />
                </div>
                <div>
                    <label className="block text-gray-300">
                        Number of Children
                    </label>
                    <input
                        type="number"
                        name="numberOfChildren"
                        value={formData.numberOfChildren}
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-gray-700 text-white"
                    />
                </div>
                <div>
                    <label className="block text-gray-300">
                        Number of Males
                    </label>
                    <input
                        type="number"
                        name="numberOfMales"
                        value={formData.numberOfMales}
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-gray-700 text-white"
                    />
                </div>
                <div>
                    <label className="block text-gray-300">
                        Number of Females
                    </label>
                    <input
                        type="number"
                        name="numberOfFemales"
                        value={formData.numberOfFemales}
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-gray-700 text-white"
                    />
                </div>
                <div className="text-right">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white py-2 px-4 rounded"
                    >
                        Proceed to payment
                    </button>
                </div>
            </form>
        </div>
    );
};

export default BookingForm