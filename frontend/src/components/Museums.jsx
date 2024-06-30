import React, { useState } from "react";
import Museum from "./Museum";
import BookingForm from "./BookingForm";

const Museums = () => {
    const museums = [
        {
            name: "National Museum",
            location: "New Delhi",
            description:
                "The National Museum in New Delhi holds a variety of articles ranging from pre-historic era to modern works of art.",
            established: 1949,
            timings: {
                open: "10:00 AM",
                close: "6:00 PM",
            },
            entry_fee: {
                adults: 20,
                children: 10,
                foreigners: 650,
            },
        },
        {
            name: "Indian Museum",
            location: "Kolkata",
            description:
                "The Indian Museum in Kolkata is the largest and oldest museum in India, and has rare collections of antiques, armor, ornaments, fossils, skeletons, mummies, and Mughal paintings.",
            established: 1814,
            timings: {
                open: "10:00 AM",
                close: "5:00 PM",
            },
            entry_fee: {
                adults: 50,
                children: 20,
                foreigners: 500,
            },
        },
        {
            name: "Chhatrapati Shivaji Maharaj Vastu Sangrahalaya",
            location: "Mumbai",
            description:
                "Chhatrapati Shivaji Maharaj Vastu Sangrahalaya, formerly known as the Prince of Wales Museum of Western India, is the main museum in Mumbai.",
            established: 1922,
            timings: {
                open: "10:15 AM",
                close: "6:00 PM",
            },
            entry_fee: {
                adults: 85,
                children: 20,
                foreigners: 500,
            },
        },
        {
            name: "Government Museum",
            location: "Chennai",
            description:
                "The Government Museum in Chennai, also known as the Egmore Museum, is the second oldest museum in India. It is particularly rich in archaeological and numismatic collections.",
            established: 1851,
            timings: {
                open: "9:30 AM",
                close: "5:00 PM",
            },
            entry_fee: {
                adults: 15,
                children: 10,
                foreigners: 250,
            },
        },
        {
            name: "Salar Jung Museum",
            location: "Hyderabad",
            description:
                "The Salar Jung Museum is an art museum located at Dar-ul-Shifa, on the southern bank of the Musi River in the city of Hyderabad. It is one of the three National Museums of India.",
            established: 1951,
            timings: {
                open: "10:00 AM",
                close: "5:00 PM",
            },
            entry_fee: {
                adults: 20,
                children: 10,
                foreigners: 500,
            },
        },
        {
            name: "Shankar's International Dolls Museum",
            location: "New Delhi",
            description:
                "The Shankar's International Dolls Museum is a large collection of dolls in New Delhi, India. It was set up by K. Shankar Pillai, a political cartoonist.",
            established: 1965,
            timings: {
                open: "10:00 AM",
                close: "5:30 PM",
            },
            entry_fee: {
                adults: 15,
                children: 5,
                foreigners: 100,
            },
        },
    ];
    const [museum,setMuseum] = useState({});
    const [isOpen, setIsOpen] = useState(false);
    const toggleForm = (museum) => {
        console.log(museum)
        setMuseum(museum);
        setIsOpen(!isOpen);
    };

    return (
        <>
            <BookingForm isOpen={isOpen} setIsOpen={setIsOpen} museum={museum}/>
            <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2  grid-cols-1 gap-10 w-fit mx-auto">
                {museums.map((museum, index) => (
                    <Museum key={index} museum={museum} onClick={(museum)=>{toggleForm(museum)}}/>
                ))}
            </div>
        </>
    );
};

export default Museums;
