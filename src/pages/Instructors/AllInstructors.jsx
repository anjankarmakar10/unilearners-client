import { motion } from "framer-motion";
import useInstructors from "../../hooks/useInstructors";
import Instructor from "../Home/components/Instructor";
const AllInstructors = () => {
  const [data, isLoading] = useInstructors();

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
          Our Instructors
        </h2>
        <p className="max-w-3xl pt-8 text-center">
          100% of tutors on our platform are native English speakers. They are
          all experts at teaching the Unilearners curriculum. Many hold graduate
          degrees from top universities in the US, UK, and Canada. We are
          continually impressed by our tutors, and we think you will be too!
        </p>
      </motion.header>
      {isLoading ? (
        <div className="text-center my-4">
          <span className="loading loading-dots loading-lg"></span>
        </div>
      ) : (
        <motion.div whileInView={{ opacity: [0, 1] }} className="pt-4">
          <div className="instructors">
            {data?.map((teacher) => (
              <Instructor key={teacher?._id} teacher={teacher} />
            ))}
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default AllInstructors;
