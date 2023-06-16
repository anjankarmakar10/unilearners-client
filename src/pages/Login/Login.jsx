import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { BiHide, BiShow } from "react-icons/bi";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import GoogleProvider from "../../components/auth/GoogleProvider";
import { useAuth } from "../../contexts/AuthProvider";

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { state } = useLocation();
  const navigate = useNavigate();

  const from = state?.path || "/";

  const { user, signInWithEmail } = useAuth();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await signInWithEmail(data?.email, data?.password);
      reset();
      Swal.fire(
        "Successfully Sign In!",
        `Welcome back ${user?.displayName || "user"}`,
        "success"
      );
      navigate(from, { replace: true });
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div>
      <section className="container mx-auto px-6 min-h-screen drop-shadow-2xl flex flex-col md:flex-row items-center py-8">
        <div className="flex-1 w-full">
          <h3 className="text-center text-3xl md:text-4xl font-bold mb-6 text-accent-content">
            Login
          </h3>
          {error && (
            <div className="alert alert-error max-w-[500px] mx-auto my-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{error}</span>
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
            className="w-full max-w-[500px] mx-auto bg-[#F2F2F2] p-8 rounded-xl"
            action=""
          >
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
                className="input input-bordered "
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

            <div className="flex flex-col gap-2 mb-6">
              <label className="font-semibold text-xl " htmlFor="email">
                Password
              </label>
              <div className="relative w-full">
                <input
                  {...register("password", { required: true })}
                  className="input input-bordered w-full"
                  type={`${show ? "text" : "password"}`}
                  placeholder="Enter your email"
                />
                <label
                  onClick={() => setShow((prev) => !prev)}
                  className="label absolute right-2 top-2 z-10 cursor-pointer text-accent-content"
                >
                  <span className="">
                    {show ? <BiHide size={20} /> : <BiShow size={20} />}
                  </span>
                </label>
              </div>

              {errors.email && (
                <span className="mt-1 font-medium  text-red-800">
                  Password is required
                </span>
              )}
            </div>
            <button className="btn btn-neutral w-full gap-2">
              {loading && <span className="loading loading-spinner"></span>}
              Sign In
            </button>
          </motion.form>
          <GoogleProvider />
          <div className="mt-8 text-xl text-accent-content text-center">
            New here?{" "}
            <Link to="/signup" className="font-bold">
              Create a New Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
