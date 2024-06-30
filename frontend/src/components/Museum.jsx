import React from "react";
import MuseumImg from "../assets/museum.jpeg";

const Museum = ({ museum,onClick }) => {
    return (
        <div className="w-[320px] flex flex-col  items-center rounded-lg bg-gray-800 shadow-lg cursor-pointer hover:scale-105 transition-all">
            <div>
                <img
                    src={MuseumImg}
                    alt="Museum"
                    className="rounded-t-lg w-full"
                />
            </div>
            <div className="pb-6">
                <h2 className="text-xl text-white font-bold p-4">
                    {museum.name.slice(0, 30)}
                </h2>
                <p className="text-gray-300 px-4">
                    {museum.description.slice(0, 100)}...
                </p>
            </div>
            <div className="flex justify-between p-4 w-full space-x-6">
                <button className="bg-blue-600 hover:bg-blue-800 w-full py-2 text-white font-bold rounded-md shadow-sm transition-all">
                    Read More
                </button>
                <button className="bg-green-700 hover:bg-green-800 w-full py-2 text-white font-bold rounded-md shadow-sm transition-all" onClick={()=>onClick(museum)}>
                    Book Now
                </button>
            </div>
        </div>
    );
};

export default Museum;
