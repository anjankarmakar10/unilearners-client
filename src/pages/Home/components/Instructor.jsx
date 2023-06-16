import { motion } from "framer-motion";
import { TbCertificate, TbCertificateOff } from "react-icons/tb";
import { Link } from "react-router-dom";
const Instructor = ({ teacher }) => {
  return (
    <motion.article
      whileInView={{ scale: [0.2, 1] }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 20,
      }}
      className="border-2 p-6 rounded-xl flex flex-col justify-between"
      key={teacher?._id}
    >
      <div>
        <div className="flex gap-1 items-center  justify-between">
          <div>
            <h5 className="text-xl font-bold text-accent-content">
              {teacher?.name}
            </h5>
            <p className="text-sm">{teacher?.country}</p>
            <p className="text-sm ">{teacher?.email}</p>
          </div>
          <img
            className="rounded-full w-20 h-20 border-4 "
            src={teacher?.image}
            alt=""
          />
        </div>
        <div className="py-6">
          <p className="text-sm line-clamp-3">{teacher?.introduction}</p>
        </div>
        <div className="mb-6">
          <p className="text-sm">Highlights</p>
          <div className="bg-[#F7F7F7] rounded-lg p-2 my-2 text-info-content">
            {teacher?.certified ? (
              <div className="flex gap-2 items-center text-base ">
                <TbCertificate size={20} />
                <p className="font-normal ">Certified Teacher</p>
              </div>
            ) : (
              <div className="flex gap-2 items-center text-base ">
                <TbCertificateOff size={20} />
                <p className="font-normal ">Normal Teacher</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Link to={`/instructor-profile/${teacher?._id}`}>
        <button className="w-full h-10 rounded-xl text-sm text-white bg-[#236482] font-normal hover:bg-[#1F5A75]">
          View Profile
        </button>
      </Link>
    </motion.article>
  );
};

export default Instructor;
