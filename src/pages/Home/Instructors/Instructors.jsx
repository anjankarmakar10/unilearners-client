import { motion } from "framer-motion";
import useInstructors from "../../../hooks/useInstructors";
import Instructor from "../components/Instructor";

const Instructors = () => {
  const [data] = useInstructors();

  return (
    <section className="py-10 max-w-6xl mx-auto px-4">
      <motion.header
        whileInView={{ opacity: [0, 1] }}
        transition={{ duration: 1 }}
        className="py-10 flex flex-col items-center"
      >
        <h2 className="text-center font-black text-4xl md:text-6xl text-accent-content">
          Our Instructors
        </h2>
        <p className="max-w-3xl pt-8 text-center">
          100% of tutors on our platform are native English speakers. They are
          all experts at teaching the Unilearners curriculum. Many hold graduate
          degrees from top universities in the US, UK, and Canada. We are
          continually impressed by our tutors, and we think you will be too!
        </p>
        <button className="btn mt-4 bg-[#ffc929] text-accent-content">
          See our all instructors
        </button>
      </motion.header>

      <motion.div whileInView={{ opacity: [0, 1] }} className="pt-4">
        <h3 className="text-2xl md:text-3xl font-bold mb-8 text-accent-content">
          Popular instructors
        </h3>
        <div className="instructors">
          {data?.slice(0, 6).map((teacher) => (
            <Instructor key={teacher?._id} teacher={teacher} />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Instructors;
