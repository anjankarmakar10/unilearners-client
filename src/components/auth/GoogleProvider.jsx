import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../../contexts/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import addUser from "../../utils/addUser";

const GoogleProvider = () => {
  const { signInWithGoogle } = useAuth();

  const { state } = useLocation();
  const navigate = useNavigate();

  const from = state?.path || "/";

  const handleLogin = async () => {
    try {
      const { user } = await signInWithGoogle();

      const newUser = {
        role: "user",
        name: user?.displayName,
        email: user?.email,
        uid: user?.uid,
        image: user?.photoURL,
      };

      const result = await addUser(newUser);
      console.log(result);

      navigate(from, { replace: true });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="mt-6 w-fit mx-auto">
      <div className="flex flex-col items-center mt-4 gap-4">
        <span className="text-xl text-center font-medium text-accent-content">
          Or sign in with
        </span>

        <button
          onClick={handleLogin}
          className="btn text-white bg-accent-content hover:bg-neutral"
        >
          <FcGoogle size={24} />
          Sign in with google
        </button>
      </div>
    </div>
  );
};

export default GoogleProvider;
