import { useEnrolled } from "../../../hooks/useEnrolled";
import EnrolledItem from "./EnrolledItem";

const EnrolledClasses = () => {
  const [data] = useEnrolled();

  if (data?.length === 0) {
    return (
      <section className="max-w-6xl mx-auto py-8">
        <div className="alert shadow-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-info shrink-0 w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <div>
            <h3 className="font-bold">No class Enrolled</h3>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <div className="alert shadow-lg w-full rounded-none ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="stroke-info shrink-0 w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <div className="px-4">
          <h3 className="font-bold">Total Enrolled Class : {data?.length}</h3>
        </div>
      </div>
      <section className="container mx-auto py-8">
        <div className="flex gap-4 flex-wrap items-center justify-center">
          {data?.map((item) => (
            <EnrolledItem key={item?._id} item={item} />
          ))}
        </div>
      </section>
    </>
  );
};

export default EnrolledClasses;
