import { useAuth } from "../contexts/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import { useRole } from "../hooks/useRole";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [data, isLoading] = useRole();
  const admin = data?.role === "admin";

  const { pathname } = useLocation();

  if (loading || isLoading) {
    return (
      <section className="grid place-content-center hero-h ">
        <span className="loading loading-dots loading-lg"></span>
      </section>
    );
  }
  if (user && admin) {
    return children;
  }

  return <Navigate state={{ path: pathname }} to={"/"} />;
};

export default AdminRoute;
