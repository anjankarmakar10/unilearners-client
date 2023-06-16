import { motion } from "framer-motion";
import { Link, useLoaderData } from "react-router-dom";
import Class from "../Home/components/Class";
import useInstructorClasses from "../../hooks/useInstructorClasses";

const InstructorProfile = () => {
  const { data } = useLoaderData();

  const [items] = useInstructorClasses(data?.email);

  return (
    <section className="container mx-auto py-8 pt-4">
      <Link
        to={"/instructors"}
        className="underline text-accent-content font-bold pl-4"
      >
        All Classes
      </Link>
      <motion.div
        whileInView={{ scale: [0.2, 1] }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20,
        }}
        className="font-light text-accent-content sm:text-lg mt-8 md:mt-0 max-w-lg mx-auto"
      >
        <div className="flex items-center gap-4">
          <div className="max-w-xs">
            <img
              className="w-full rounded-lg"
              src={data?.image}
              alt={data?.name}
            />
          </div>
          <div>
            <h2 className="mb-1 text-3xl md:text-4xl tracking-tight font-extrabold  ">
              {data?.name}
            </h2>
            <p className="font-medium">{data?.country}</p>
          </div>
        </div>

        <div className="flex flex-col gap-1 my-6">
          <p>
            {data?.introduction}{" "}
            <span className="underline text-sm font-semibold text-primary">
              {data?.introduction ? data?.email : ""}
            </span>
          </p>
        </div>
      </motion.div>

      <motion.header
        whileInView={{ scale: [0.2, 1] }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
        className="py-10 flex flex-col items-center"
      >
        <h2 className="text-center text-accent-content font-black text-3xl md:text-4xl">
          Classes
        </h2>
      </motion.header>

      <motion.div whileInView={{ opacity: [0, 1] }} className="pt-4">
        {items?.length === 0 ? (
          <h3>No class avaiable</h3>
        ) : (
          <div className="instructors mx-auto">
            {items?.map((item) => (
              <Class key={item?._id} item={item} />
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
};

export default InstructorProfile;
