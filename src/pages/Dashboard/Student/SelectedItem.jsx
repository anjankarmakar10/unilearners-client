import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useCarts } from "../../../hooks/useCarts";

const SelectedItem = ({ item }) => {
  const [, refetch] = useCarts();

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
        const { data } = await axios.delete(`/carts/${item?._id}`);

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
    <div className="card max-w-sm w-full h-56 bg-base-100 shadow-xl image-full">
      <figure>
        <img className=" object-cover" src={item?.image} alt={item?.name} />
      </figure>
      <div className="card-body">
        <h2 className="card-title line-clamp-1">{item?.name}</h2>
        <div>
          <p>Price: ${item?.price}</p>
          <Link className="underline" to={`/class-details/${item?.classId}`}>
            View details
          </Link>
        </div>
        <div className="card-actions justify-end flex gap-4 mt-8">
          <button onClick={handleDelete} className="btn btn-primary">
            Delete
          </button>
          <Link state={{ class: item }} to={`/dashboard/payment`}>
            <button className="btn border-0 bg-accent-content hover:bg-neutral text-white ">
              Enroll
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SelectedItem;
