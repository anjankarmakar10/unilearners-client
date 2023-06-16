import { motion } from "framer-motion";
import images from "./images";

const Features = () => {
  return (
    <section>
      <motion.div
        whileInView={{ scale: [0.2, 1] }}
        transition={{
          type: "spring",
          stiffness: 220,
          damping: 30,
        }}
        className="flex justify-center py-10"
      >
        <img
          src="https://daisyui.com/images/emoji/heart-on-fire@80.webp"
          alt=""
        />
      </motion.div>
      <motion.div
        whileInView={{ opacity: [0, 1] }}
        transition={{
          type: "spring",
          duration: 1,
        }}
        className="flex flex-col gap-4 "
      >
        <h1 className="text-4xl md:text-6xl font-black text-center text-accent-content">
          Learn with our community
        </h1>
        <h2 className="text-3xl md:text-5xl text-center text-accent-content">
          Thousands of happy students
        </h2>
      </motion.div>
      <motion.div className="max-w-3xl mx-auto px-4 flex gap-2 flex-wrap justify-center mt-20">
        {images?.map((item) => (
          <motion.article
            whileInView={{ scale: [0.2, 1] }}
            transition={{
              type: "spring",
              stiffness: 220,
              damping: 20,
            }}
            key={item.id}
            className="mask mask-squircle w-20 h-20"
          >
            <img src={item.image} alt="" />
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
};

export default Features;
