import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useAuth } from "../../contexts/AuthProvider";
import Swal from "sweetalert2";

const ClassDetails = () => {
  const { data } = useLoaderData();
  const axios = useAxiosSecure();
  const { user } = useAuth();
  const selectRef = useRef();
  const [enrolled, setEnrolled] = useState(null);

  useEffect(() => {
    axios.get(`enrolled/${data?._id}`).then(({ data }) => {
      setEnrolled(data);
    });
  }, []);

  const handleSelect = async () => {
    const item = {
      name: data?.name,
      classId: data?._id,
      email: user?.email,
      price: data?.price,
      image: data?.image,
      seats: data?.seats,
      enrolled: data?.enrolled,
    };

    try {
      const { data } = await axios.post("/carts", item);
      if (data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Successfully add on cart",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <section className="container mx-auto pt-4">
      <Link
        to={"/classes"}
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
        className="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6 justify-items-center "
      >
        <div className="max-w-xs mx-auto">
          <img
            className="w-full rounded-lg"
            src={data?.image}
            alt={data?.name}
          />
        </div>

        <motion.div
          whileInView={{ scale: [0.2, 1] }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 20,
          }}
          className="font-light text-accent-content sm:text-lg mt-8 md:mt-0"
        >
          <h2 className="mb-1 text-3xl md:text-4xl tracking-tight font-extrabold  ">
            {data?.name}
          </h2>
          <p className="font-medium">by {data?.instructorName}</p>

          <div className="flex flex-col gap-1 my-6">
            <p>{data?.info}</p>
            <p>Available seats: {data?.seats}</p>
            <p>Enrolled: {data?.enrolled}</p>
            <p>Difficulty: {data?.difficulty}</p>
          </div>
          <div className="flex flex-col  gap-4">
            <span className="text-3xl font-bold">${data?.price}</span>
            <div className="flex flex-col md:flex-row gap-2">
              {enrolled ? (
                <button className="btn border-0 bg-accent-content hover:bg-neutral  max-w-[200px] w-full text-neutral-content">
                  Enrolled
                </button>
              ) : (
                <button
                  ref={selectRef}
                  onClick={handleSelect}
                  className="btn  bg-[#ffc929] text-accent-content max-w-[200px] w-full"
                >
                  Select
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ClassDetails;
