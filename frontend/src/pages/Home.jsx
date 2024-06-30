import React from "react";
import Museums from "../components/Museums";

const Home = () => {
    return (
      <div className="p-8">
        <div>
          <h1 className="text-3xl text-white font-bold text-center w-full pb-8">
            Explore the world of museums
          </h1>
        </div>
        <Museums />
      </div>
    )
};

export default Home;
