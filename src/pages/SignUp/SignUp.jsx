import { useState } from "react";
import Swal from "sweetalert2";
import { BiHide, BiShow } from "react-icons/bi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import GoogleProvider from "../../components/auth/GoogleProvider";
import { useForm } from "react-hook-form";
import uploadImage from "../../utils/uploadImage";
import { useAuth } from "../../contexts/AuthProvider";
import addUser from "../../utils/addUser";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const { signUpWithEmail, updateUserProfile } = useAuth();

  const { state } = useLocation();
  const navigate = useNavigate();

  const from = state?.path || "/";

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const { data: item } = await uploadImage(data?.image);
      const image = item?.data?.display_url;

      const { user } = await signUpWithEmail(data?.email, data?.password);
      await updateUserProfile(user, data?.name, image);

      const newUser = {
        role: "user",
        name: user?.displayName,
        email: user?.email,
        image: image,
        uid: user?.uid,
      };

      const result = await addUser(newUser);

      if (result.insertedId) {
        reset();
        setLoading(false);
        Swal.fire("Successfully Account Created!", "", "success");
        navigate(from, { replace: true });
      }
    } catch (error) {
      setLoading(false);
      setMessage(error.message);
    }
  };

  return (
    <div className={`py-10 px-2 bg-auth`}>
      <section className="container mx-auto px-6 bg-auth min-h-[90vh] drop-shadow-2xl flex flex-col md:flex-row-reverse items-center py-8 text-accent-content">
        <div className="flex-1 w-full ">
          <h3 className="text-center text-3xl md:text-4xl font-bold mb-2 text-accent-content">
            Sign Up
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
              <label className="font-semibold text-xl" htmlFor="email">
                Name
              </label>
              <input
                {...register("name", { required: true })}
                className="input outline-none outline-blue-500 focus-within:outline-4 drop-shadow-sm px-4 md:px-6 rounded-lg text-accent-content placeholder:text-[#a1a1a1]"
                type="text"
                placeholder="Enter your name"
              />
              {errors.name && (
                <span className="mt-1 font-medium  text-red-800">
                  Name is required
                </span>
              )}
            </div>
            <div className="flex flex-col gap-4 mb-6">
              <label className="font-semibold text-xl" htmlFor="email">
                Profile Photo
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

            <div className="flex flex-col gap-4 mb-6">
              <label className="font-semibold text-xl" htmlFor="email">
                Email
              </label>
              <input
                {...register("email", {
                  required: true,
                  pattern:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                })}
                className="input outline-none outline-blue-500 focus-within:outline-4 drop-shadow-sm px-4 md:px-6 rounded-lg text-accent-content placeholder:text-[#a1a1a1]"
                type="email"
                placeholder="Enter your email"
              />
              {errors.email?.type === "required" && (
                <span className="mt-1 font-medium  text-red-800">
                  Email is required
                </span>
              )}
              {errors.email?.type === "pattern" && (
                <span className="mt-1 font-medium  text-red-800">
                  Please enter a valid email
                </span>
              )}
            </div>

            <div className="flex flex-col gap-4 mb-6">
              <label className="font-semibold text-xl" htmlFor="email">
                Password
              </label>
              <div className="w-full relative">
                <input
                  {...register("password", {
                    required: true,
                    pattern:
                      /^(?=.{6,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/,
                    minLength: 6,
                  })}
                  className="input outline-none outline-blue-500 focus-within:outline-2 drop-shadow-sm px-4 md:px-6 rounded-lg text-accent-content placeholder:text-[#a1a1a1] w-full"
                  type={`${show ? "text" : "password"}`}
                  placeholder="Enter your password"
                />
                <label
                  onClick={() => setShow((prev) => !prev)}
                  className="label absolute right-2 top-2 z-10 cursor-pointer"
                >
                  <span className="">
                    {show ? <BiHide size={20} /> : <BiShow size={20} />}
                  </span>
                </label>
              </div>
              {errors.password?.type === "required" && (
                <span className="mt-1 font-medium  text-red-800">
                  Password is required
                </span>
              )}
              {errors.password?.type === "pattern" && (
                <span className="mt-1 font-medium  text-red-800">
                  Password should contain at least one digit one lower case, one
                  upper case and one special character .
                </span>
              )}
              {errors.password?.type === "minLength" && (
                <span className="mt-1 font-medium  text-red-800">
                  Password length must be upto 6 char
                </span>
              )}
            </div>

            <div className="flex flex-col gap-4 mb-6">
              <label className="font-semibold text-xl" htmlFor="email">
                Confirm Password
              </label>
              <div className="w-full relative">
                <input
                  {...register("confirmPassword", {
                    required: true,
                    pattern:
                      /^(?=.{6,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/,
                    minLength: 6,
                    validate: (val) => {
                      if (watch("password") !== val) {
                        return "Your passwords do no match!";
                      }
                    },
                  })}
                  className="input outline-none outline-blue-500 focus-within:outline-2 drop-shadow-sm px-4 md:px-6 rounded-lg text-accent-content placeholder:text-[#a1a1a1] w-full"
                  type={`${show ? "text" : "password"}`}
                  placeholder="Enter the password again"
                />
                <label
                  onClick={() => setShow((prev) => !prev)}
                  className="label absolute right-2 top-2 z-10 cursor-pointer"
                >
                  <span className="">
                    {show ? <BiHide size={20} /> : <BiShow size={20} />}
                  </span>
                </label>
              </div>
              {errors.confirmPassword?.type === "required" && (
                <span className="mt-1 font-medium  text-red-800">
                  Password is required
                </span>
              )}
              {errors.confirmPassword?.type === "pattern" && (
                <span className="mt-1 font-medium  text-red-800">
                  Password should contain at least one digit one lower case, one
                  upper case and one special character .
                </span>
              )}
              {errors.confirmPassword?.type === "minLength" && (
                <span className="mt-1 font-medium  text-red-800">
                  Password length must be upto 6 char
                </span>
              )}
              {errors.confirmPassword && (
                <span className="mt-1 font-medium  text-red-800">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>

            <button className="btn btn-neutral w-full gap-2" disabled={loading}>
              {loading && <span className="loading loading-spinner"></span>}
              Sign Up
            </button>
          </motion.form>
          <GoogleProvider />
          <div className="mt-8 text-xl text-accent-content text-center">
            Already registered?{" "}
            <Link to="/login" className="font-bold">
              Go to log in
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignUp;
