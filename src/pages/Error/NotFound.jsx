import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="min-h-screen max-w-3xl  mx-auto flex flex-col-reverse md:flex-row items-center text-accent-content justify-center ">
      <motion.div
        whileInView={{ scale: [0.2, 1] }}
        transition={{
          type: "spring",
          stiffness: 220,
          damping: 20,
        }}
        className="flex-1"
      >
        <h3 className="my-5 text-4xl font-medium">Oops!</h3>
        <p className="max-w-xs mb-5 text-xl">
          We can't seem to find the page you're looking for. You can try
          retracing your steps or return to the homepage.
        </p>

        <p className="text-sm text-gray-400 font-medium">Error Code: 404</p>

        <Link to={"/"}>
          <motion.button
            whileHover={{ scale: [1, 1.2] }}
            transition={{
              type: "spring",
              stiffness: 220,
              damping: 20,
            }}
            className=" text-white mt-4 text-sm uppercase bg-[#228891] rounded px-4 py-[6px] w-52"
          >
            GO TO HOME
          </motion.button>
        </Link>
      </motion.div>
      <motion.div
        whileInView={{ scale: [0.2, 1] }}
        whileHover={{ scale: [1, 1.2] }}
        transition={{
          type: "spring",
          stiffness: 220,
          damping: 20,
        }}
        className="flex-1"
      >
        <img src="https://i.ibb.co/ck1SGFJ/Group.png" alt="" />
      </motion.div>
    </section>
  );
};

export default NotFound;
