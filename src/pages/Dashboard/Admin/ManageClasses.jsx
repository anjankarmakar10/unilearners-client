import { useEffect, useState } from "react";
import { useAllClasses } from "../../../hooks/useAllClasses";
import ClassRow from "./ClassRow";
const ManageClasses = () => {
  const [filter, setFilter] = useState("");
  const [data, refetch, isLoading] = useAllClasses(filter);

  useEffect(() => {
    refetch();
  }, [filter]);

  return (
    <div>
      <div className="flex gap-4 mb-2 pt-4 items-center justify-end pr-8">
        <select
          onChange={(e) => setFilter(e.target.value)}
          className="select select-bordered select-ghost w-full max-w-xs"
        >
          <option disabled> ---filter by status--- </option>
          <option value={""}>All</option>
          <option value={"active"}>Active</option>
          <option value={"pending"}>Pending</option>
          <option value={"denied"}>Denied</option>
        </select>
      </div>
      {data?.length === 0 ? (
        <section className="max-w-6xl mx-auto py-4">
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
      ) : (
        <div className="pt-2 px-4">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th></th>
                  <th>Class</th>
                  <th>Author</th>
                  <th>Seats</th>
                  <th>Price</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {data?.map((item, index) => (
                  <ClassRow key={item?._id} item={item} index={index} />
                ))}
              </tbody>
            </table>
          </div>
          {isLoading && (
            <div className="p-4 w-fit mx-auto py-8 flex justify-center items-center">
              <span className="loading loading-dots loading-lg"></span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ManageClasses;
