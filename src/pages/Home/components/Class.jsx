import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useRole } from "../../../hooks/useRole";

const Class = ({ item, full = false }) => {
  const [data] = useRole();
  const role = data?.role;
  const admin = role === "admin" || role === "instructor";
  const off = item?.seats === 0;

  return (
    <motion.article
      whileInView={{ scale: [0.2, 1] }}
      transition={{
        type: "spring",
        stiffness: 220,
        damping: 20,
      }}
      className={`${
        full ? "card2" : "card1"
      } rounded-xl cursor-pointer overflow-hidden flex flex-col justify-between pb-2 ${
        admin && "pointer-events-none"
      }
      ${off && "pointer-events-none border-4 border-red-600"}
      `}
    >
      <div>
        <img src={item?.image} alt={item?.name} />
        <div className="p-3">
          <h4 className="text-lg pb-[5px] font-medium text-accent-content leading-5 line-clamp-2">
            {item?.name}
          </h4>
          <p className="text-sm line-clamp-2 ">{item?.info}</p>
        </div>
      </div>

      <div className="px-3 flex flex-col text-[11px] uppercase font-medium">
        <div>
          <p>{item?.difficulty}</p>
        </div>
        <div className="">
          <div className="flex justify-between items-center">
            <p className="capitalize">available seats: {item?.seats}</p>
            <p className="text-base">${item?.price}</p>
          </div>
          <Link to={`/class-details/${item?._id}`}>
            <button
              disabled={admin}
              className="w-full h-8 rounded-xl text-sm text-white bg-[#236482] font-normal hover:bg-[#1F5A75]"
            >
              View Class
            </button>
          </Link>
        </div>
      </div>
    </motion.article>
  );
};

export default Class;
