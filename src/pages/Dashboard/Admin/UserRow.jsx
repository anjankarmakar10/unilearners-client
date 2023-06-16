import { MdDelete, MdEdit } from "react-icons/md";
import { useAuth } from "../../../contexts/AuthProvider";
import { useUsers } from "../../../hooks/useUsers";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";
useAxiosSecure;
const UserRow = ({ user, index }) => {
  const { user: auth } = useAuth();
  const [, refetch] = useUsers();
  const axios = useAxiosSecure();
  const [show, setShow] = useState(false);

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      const deleteItem = async () => {
        const { data } = await axios.delete(`/users/${user?._id}`);

        if (data.deletedCount > 0) {
          refetch();
          Swal.fire("Deleted!", "Your menu has been deleted.", "success");
        }
      };

      if (result.isConfirmed) {
        deleteItem();
      }
    });
  };

  const handleRole = async (role) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to make ${user?.role} to ${role}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, make ${role}`,
    }).then((result) => {
      const update = async () => {
        const { data } = await axios.patch(`/users/${user?._id}`, { role });

        if (data.acknowledged) {
          refetch();
          setShow(false);
          Swal.fire("Success!", "User role updated successfully", "success");
        }
      };

      if (result.isConfirmed) {
        update();
      }
    });
  };

  return (
    <tr>
      <th>{index + 1}</th>
      <td>
        <div className="avatar">
          <div className="mask mask-squircle w-12 h-12">
            <img src={`${user?.image}`} alt={user?.name} />
          </div>
        </div>
      </td>
      <td className="font-semibold">{user?.name}</td>
      <td>{user?.email}</td>
      <td className="relative">
        {show && (
          <div className="flex gap-1 items-center absolute top-[30px] left-[-120px] ">
            {user?.role !== "admin" && (
              <span
                onClick={() => handleRole("admin")}
                className="badge badge-success cursor-pointer"
              >
                Admin
              </span>
            )}
            {user?.role !== "instructor" && (
              <span
                onClick={() => handleRole("instructor")}
                className="badge badge-info cursor-pointer"
              >
                Instructor
              </span>
            )}
            {user?.role !== "user" && (
              <span
                onClick={() => handleRole("user")}
                className="badge badge-warning cursor-pointer"
              >
                User
              </span>
            )}
          </div>
        )}

        <span className="capitalize flex gap-1 items-start">
          {user?.role}
          {auth?.email !== user?.email && (
            <div
              onClick={() => setShow((prev) => !prev)}
              className="cursor-pointer"
            >
              <MdEdit size={18} />
            </div>
          )}
        </span>
      </td>
      <td>
        {auth?.email !== user?.email && (
          <button onClick={handleDelete} className="btn btn-error btn-square">
            <MdDelete size={24} />
          </button>
        )}
      </td>
    </tr>
  );
};

export default UserRow;
