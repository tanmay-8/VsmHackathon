import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center p-4 lg:px-10 md:px-6">
                <div className="text-white text-2xl font-bold">Museum Visitor</div>
                <div className="hidden md:flex space-x-10 text-lg">
                    <Link  to={"/"} className="text-gray-300 hover:text-white">
                        Home
                    </Link>
                    <Link to="/about" className="text-gray-300 hover:text-white">
                        About
                    </Link>
                    <Link
                        to="/services"
                        className="text-gray-300 hover:text-white"
                    >
                        Services
                    </Link>
                    <Link
                        to="/contact"
                        className="text-gray-300 hover:text-white"
                    >
                        Contact
                    </Link>
                </div>
                <div className="md:hidden">
                    <button
                        onClick={toggleMenu}
                        className="text-gray-300 focus:outline-none"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d={
                                    isOpen
                                        ? "M6 18L18 6M6 6l12 12"
                                        : "M4 6h16M4 12h16m-7 6h7"
                                }
                            ></path>
                        </svg>
                    </button>
                </div>
            </div>
            {isOpen && (
                <div className="md:hidden mt-2 px-4 space-y-4">
                    <Link
                        to="/home"
                        className="block text-gray-300 hover:text-white"
                    >
                        Home
                    </Link>
                    <Link
                        to="/about"
                        className="block text-gray-300 hover:text-white"
                    >
                        About
                    </Link>
                    <Link
                        to="/services"
                        className="block text-gray-300 hover:text-white"
                    >
                        Services
                    </Link>
                    <Link
                        to="/contact"
                        className="block text-gray-300 hover:text-white"
                    >
                        Contact
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
