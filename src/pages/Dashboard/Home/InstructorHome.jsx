import { useAuth } from "../../../contexts/AuthProvider";
import { useMyclasses } from "../../../hooks/useMyclasses";

const InstructorHome = () => {
  const { user } = useAuth();

  const [classes] = useMyclasses();

  return (
    <div>
      <section>
        <h3 className="text-center pb-4 font-bold text-accent-content text-3xl md:text-4xl">
          Welcome back{" "}
          <span className="text-[#1DBF73]">{user?.displayName}</span>
        </h3>

        <div className="w-fit mx-auto">
          <div className="stats shadow ">
            <div className="stat place-items-center">
              <div className="stat-title">Total Classes</div>
              <div className="stat-value">{classes?.length}</div>
            </div>

            <div className="stat place-items-center">
              <div className="stat-title">Active Classes</div>
              <div className="stat-value text-secondary">
                {classes?.filter((item) => item?.status === "active").length}
              </div>
            </div>

            <div className="stat place-items-center">
              <div className="stat-title">Total Students</div>
              <div className="stat-value">
                {classes
                  ?.filter((item) => item?.status === "active")
                  ?.reduce((total, item) => (total += item?.enrolled), 0)}
              </div>
            </div>
            <div className="stat place-items-center">
              <div className="stat-title">Total Earned</div>
              <div className="stat-value">
                $
                {classes
                  ?.filter((item) => item?.status === "active")
                  ?.reduce((total, item) => (total += +item?.price), 0)}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InstructorHome;
