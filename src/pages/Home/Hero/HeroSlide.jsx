import { motion } from "framer-motion";

const HeroSlide = ({ title, info, bg }) => {
  return (
    <div
      className="hero hero-h"
      style={{
        background: `url(${bg})  no-repeat center /cover`,
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="container mx-auto px-4 flex md:px-8 justify-center md:justify-start">
        <div className="hero-content text-center md:text-left  text-neutral-content ">
          <motion.div
            className="container"
            initial={{ scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
          >
            <h1 className="mb-5 text-3xl md:text-5xl font-bold text-white">
              {title}
            </h1>
            <p className="mb-5 max-w-md">{info}</p>
            <button className="btn btn-neutral text-white">Get Started</button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSlide;
