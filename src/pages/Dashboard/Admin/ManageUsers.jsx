import { useEffect, useState } from "react";
import { useUsers } from "../../../hooks/useUsers";
import UserRow from "./UserRow";

const ManageUsers = () => {
  const [role, setRole] = useState("");
  const [data, refetch, isLoading] = useUsers(role);

  const handleFilter = (e) => {
    setRole(e.target.value);
  };

  useEffect(() => {
    refetch();
  }, [role]);

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
      <div className="alert shadow-lg w-full rounded-none flex items-center justify-between">
        <div className="flex items-center gap-2">
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
            <h3 className="font-bold">Total Users : {data?.length}</h3>
          </div>
        </div>
        <select
          onChange={handleFilter}
          className="select select-bordered w-full max-w-xs"
        >
          <option disabled> ---filter by status--- </option>
          <option value={""}>All</option>
          <option value={"admin"}>Admin</option>
          <option value={"instructor"}>Instructor</option>
          <option value={"user"}>User</option>
        </select>
      </div>
      <div className="pt-8 px-4">
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th></th>
                <th>Image</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data?.map((user, index) => (
                <UserRow key={user?._id} user={user} index={index} />
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
    </>
  );
};

export default ManageUsers;
