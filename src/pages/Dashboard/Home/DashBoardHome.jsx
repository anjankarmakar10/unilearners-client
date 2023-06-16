import { useRole } from "../../../hooks/useRole";
import AdminHome from "./AdminHome";
import InstructorHome from "./InstructorHome";
import StudentHome from "./StudentHome";

const DashBoardHome = () => {
  const [data] = useRole();
  const role = data?.role;

  const admin = role === "admin";
  const instructor = role === "instructor";
  const student = role === "user";

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {admin && <AdminHome />}
      {instructor && <InstructorHome />}
      {student && <StudentHome />}
    </div>
  );
};

export default DashBoardHome;
