import { useAuth } from "../../../contexts/AuthProvider";
import { useCarts } from "../../../hooks/useCarts";
import { useEnrolled } from "../../../hooks/useEnrolled";
import { usePayments } from "../../../hooks/usePayments";

const StudentHome = () => {
  const { user } = useAuth();

  const [elrolled] = useEnrolled();
  const [payments] = usePayments();
  const [carts] = useCarts();

  const price = payments?.reduce((total, item) => (total += +item?.price), 0);

  return (
    <section>
      <h3 className="text-center pb-4 font-bold text-accent-content text-3xl md:text-4xl">
        Welcome back <span className="text-[#1DBF73]">{user?.displayName}</span>
      </h3>

      <div className="w-fit mx-auto">
        <div className="stats shadow ">
          <div className="stat place-items-center">
            <div className="stat-title">Selected Classes</div>
            <div className="stat-value">{carts?.length}</div>
          </div>

          <div className="stat place-items-center">
            <div className="stat-title">Enrolled Classes</div>
            <div className="stat-value text-secondary">{elrolled?.length}</div>
          </div>

          <div className="stat place-items-center">
            <div className="stat-title">Total Spand</div>
            <div className="stat-value">${price}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudentHome;
