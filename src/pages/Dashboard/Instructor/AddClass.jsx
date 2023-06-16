import { useState } from "react";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../contexts/AuthProvider";
import uploadImage from "../../../utils/uploadImage";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
const AddClass = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const axios = useAxiosSecure();

  const onSubmit = async (formData) => {
    try {
      setLoading(true);
      const { data } = await uploadImage(formData?.image);
      const image = data?.data?.display_url;

      const newCalss = {
        ...formData,
        instructorName: user?.displayName,
        instructorEmail: user?.email,
        status: "pending",
        enrolled: 0,
        image: image,
      };
      console.log(newCalss);

      const { data: result } = await axios.post("/classes", newCalss);
      console.log(result);

      if (result.insertedId) {
        reset();
        setLoading(false);
        Swal.fire("Successfully Class Added!", "", "success");
      }
    } catch (error) {
      setLoading(false);
      if (error.message === "Network Error") {
        setMessage(error.message, "Try Again");
      } else {
        setMessage(error.message);
      }
    }
  };

  return (
    <div className="max-w-6xl py-8 px-4 mx-auto w-full">
      <section className=" bg-auth  drop-shadow-2xl flex flex-col md:flex-row-reverse items-center  text-accent-content ">
        <div className="flex-1 w-full ">
          <h3 className="text-center text-3xl md:text-4xl font-bold mb-2 text-accent-content">
            Add a class
          </h3>

          {message && (
            <div className="alert alert-info max-w-[500px] mx-auto my-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="stroke-current shrink-0 w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>{message}</span>
            </div>
          )}
          <motion.form
            whileInView={{ scale: [0.5, 1] }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
            }}
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-[500px] mx-auto"
          >
            <div className="flex flex-col gap-4 mb-6">
              <label className="font-semibold text-xl" htmlFor="title">
                Title
              </label>
              <input
                {...register("name", { required: true })}
                className="input outline-none outline-blue-500 focus-within:outline-4 drop-shadow-sm px-4 md:px-6 rounded-lg text-accent-content placeholder:text-[#a1a1a1]"
                type="text"
                placeholder="Enter class name"
              />
              {errors.name && (
                <span className="mt-1 font-medium  text-red-800">
                  Name is required
                </span>
              )}
            </div>

            <div className="flex flex-col gap-4 mb-6">
              <label className="font-semibold text-xl" htmlFor="seats">
                Total Seats
              </label>
              <input
                {...register("seats", { required: true, pattern: /^\d+$/ })}
                className="input outline-none outline-blue-500 focus-within:outline-4 drop-shadow-sm px-4 md:px-6 rounded-lg text-accent-content placeholder:text-[#a1a1a1]"
                type="number"
                placeholder="Enter seats number"
              />
              {errors.seats && (
                <span className="mt-1 font-medium  text-red-800">
                  Seats is required
                </span>
              )}
              {errors.seats?.type === "pattern" && (
                <span className=" font-medium  text-red-800">
                  Please enter valid number
                </span>
              )}
            </div>

            <div className="flex flex-col gap-4 mb-6">
              <label className="font-semibold text-xl" htmlFor="price">
                Price
              </label>
              <input
                {...register("price", {
                  required: true,
                  pattern: /^\d+(\.\d+)?$/,
                })}
                className="input outline-none outline-blue-500 focus-within:outline-4 drop-shadow-sm px-4 md:px-6 rounded-lg text-accent-content placeholder:text-[#a1a1a1]"
                type="number"
                placeholder="Enter price"
              />
              {errors.price && (
                <span className="mt-1 font-medium  text-red-800">
                  Price is required
                </span>
              )}
              {errors.price?.type === "pattern" && (
                <span className=" font-medium  text-red-800">
                  Please enter valid price
                </span>
              )}
            </div>

            <div className="flex flex-col gap-4 mb-6">
              <label className="font-semibold text-xl" htmlFor="Difficulty">
                Difficulty
              </label>
              <select
                {...register("difficulty", { required: true })}
                className="select select-bordered select-ghost w-full max-w-xs"
              >
                <option>BEGINNER</option>
                <option>INTERMEDIATE</option>
                <option>ADVANCED</option>
              </select>
            </div>

            <div className="flex flex-col gap-4 mb-6">
              <label className="font-semibold text-xl" htmlFor="email">
                Class Photo
              </label>
              <input
                {...register("image", { required: true })}
                type="file"
                className="file-input file-input-bordered w-full max-w-xs"
              />

              {errors.image && (
                <span className="mt-1 font-medium  text-red-800">
                  Photo is required
                </span>
              )}
            </div>

            <div className="flex flex-col gap-4 mb-8">
              <label className="font-semibold text-xl" htmlFor="Details">
                Details
              </label>
              <textarea
                {...register("info", { required: true })}
                className="textarea outline-none outline-blue-500 focus-within:outline-4 drop-shadow-sm px-4 md:px-6 rounded-lg text-accent-content placeholder:text-[#a1a1a1] min-h-[150px]"
                type="text"
                placeholder="Enter class details"
              ></textarea>

              {errors.info && (
                <span className="mt-1 font-medium  text-red-800">
                  Details is required
                </span>
              )}
            </div>

            <div className="flex flex-col gap-4 mb-8">
              <label
                className="font-semibold text-xl"
                htmlFor="instructorEmail"
              >
                Name
              </label>
              <input
                disabled
                className="input input-ghost"
                type="text"
                value={user?.displayName}
              />
            </div>
            <div className="flex flex-col gap-4 mb-8">
              <label className="font-semibold text-xl" htmlFor="email">
                Email
              </label>
              <input
                disabled
                className="input input-ghost"
                type="email"
                value={user?.email}
              />
            </div>

            <button className="btn btn-neutral w-full" disabled={loading}>
              Add Class
            </button>
          </motion.form>
        </div>
      </section>
    </div>
  );
};

export default AddClass;
