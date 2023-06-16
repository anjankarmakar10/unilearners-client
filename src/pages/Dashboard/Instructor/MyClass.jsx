import { MdDelete, MdEdit, MdFeedback } from "react-icons/md";
import { useMyclasses } from "../../../hooks/useMyclasses";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyClass = ({ item, index }) => {
  const [, refetch] = useMyclasses();

  const axios = useAxiosSecure();

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
        const { data } = await axios.delete(`/myclasses/${item?._id}`);

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

  return (
    <>
      <tr key={item?._id}>
        <th>{index + 1}</th>
        <td>
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img src={item?.image} alt={item?.name} />
            </div>
          </div>
        </td>
        <td className="font-semibold">{item?.name}</td>
        <td>{item?.enrolled}</td>
        <td>${item?.price}</td>
        <td>
          <span className="capitalize">
            {item?.status === "pending" ? (
              <span className="badge badge-warning">{item?.status}</span>
            ) : (
              <span
                className={`badge ${
                  item?.status === "active" ? "badge-success" : "badge-error"
                }`}
              >
                {item?.status}
              </span>
            )}
          </span>
        </td>
        <td>
          {item?.feedback ? (
            <button
              onClick={() => Swal.fire("Feedback", `${item?.feedback}`, "info")}
              className="btn btn-square"
            >
              <MdFeedback size={24} />
            </button>
          ) : (
            <Link to={`/dashboard/updateclass/${item?._id}`}>
              <button className="btn btn-square">
                <MdEdit size={24} />
              </button>
            </Link>
          )}
        </td>
        <td>
          <button onClick={handleDelete} className="btn btn-square">
            <MdDelete size={24} />
          </button>
        </td>
      </tr>
    </>
  );
};

export default MyClass;
