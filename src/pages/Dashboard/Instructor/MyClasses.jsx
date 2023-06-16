import { useMyclasses } from "../../../hooks/useMyclasses";
import MyClass from "./MyClass";

const MyClasses = () => {
  const [data] = useMyclasses();
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
            <h3 className="font-bold">No class available</h3>
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
          <h3 className="font-bold">Total Classes : {data?.length}</h3>
        </div>
      </div>
      <section className="px-4 py-8 overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Image</th>
              <th>Name</th>
              <th>Enrolled</th>
              <th>Price</th>
              <th>Status</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => (
              <MyClass key={item?._id} item={item} index={index} />
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default MyClasses;
