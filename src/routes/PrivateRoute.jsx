import { useAuth } from "../contexts/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  const { pathname } = useLocation();

  if (loading) {
    return (
      <section className="grid place-content-center hero-h ">
        <span className="loading loading-dots loading-lg"></span>
      </section>
    );
  }
  if (user) {
    return children;
  }

  return <Navigate state={{ path: pathname }} to={"/login"} />;
};

export default PrivateRoute;
