import usePopulars from "../../../hooks/usePopulars";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import Class from "../components/Class";
const Classes = () => {
  const [data] = usePopulars();

  return (
    <section className="py-10 container mx-auto px-4">
      <motion.header
        whileInView={{ scale: [0.2, 1] }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
        className="py-10 flex flex-col items-center"
      >
        <h2 className="text-center text-accent-content font-black text-4xl md:text-6xl">
          Our classes
        </h2>
        <p className="max-w-3xl pt-8 text-center">
          Unlock the world of languages and experience the joy of learning with
          our comprehensive courses. From beginner to advanced levels, we have
          everything you need to become fluent in your chosen language.
        </p>
        <button className="btn mt-4 bg-[#ffc929] text-accent-content">
          See our all classes
        </button>
      </motion.header>

      <motion.div whileInView={{ opacity: [0, 1] }} className="pt-4">
        <h3 className="text-2xl md:text-3xl font-bold mb-8 text-accent-content">
          Popular classes
        </h3>

        <div>
          <Swiper
            slidesPerView={1}
            spaceBetween={20}
            loop={true}
            className="justify-center"
            breakpoints={{
              375: {
                width: 576,
                slidesPerView: 2,
              },
              768: {
                width: 768,
                slidesPerView: 2,
              },
              1024: {
                width: 1024,
                slidesPerView: 3,
              },
            }}
          >
            {data?.slice(0, 6).map((item) => (
              <SwiperSlide key={item?._id}>
                <Class item={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </motion.div>
    </section>
  );
};

export default Classes;
