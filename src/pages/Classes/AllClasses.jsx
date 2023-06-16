import { motion } from "framer-motion";
import useClasses from "../../hooks/useClasses";
import Class from "../Home/components/Class";
import { useState } from "react";
import { useEffect } from "react";

const AllClasses = () => {
  const [filter, setFilter] = useState("");

  const [data, isLoading, refetch] = useClasses(filter);

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    refetch();
  }, [filter]);

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
      </motion.header>

      <div>
        <div className="flex gap-4 mb-6 items-center justify-end">
          <select
            onChange={handleFilter}
            className="select select-bordered select-ghost w-full max-w-xs"
          >
            <option disabled> ---filter by difficulty--- </option>
            <option value={""}>All</option>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center my-4">
          <span className="loading loading-dots loading-lg"></span>
        </div>
      ) : (
        <motion.div whileInView={{ opacity: [0, 1] }} className="pt-4">
          <div className="instructors">
            {data?.map((item) => (
              <Class key={item?._id} full={true} item={item} />
            ))}
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default AllClasses;
