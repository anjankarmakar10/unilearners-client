import React from "react";
import Hero from "./Hero/Hero";
import Classes from "./Classes/Classes";
import Instructors from "./Instructors/Instructors";
import Features from "./Features/Features";

const Home = () => {
  return (
    <div>
      <Hero />
      <Classes />
      <Instructors />
      <Features />
    </div>
  );
};

export default Home;
