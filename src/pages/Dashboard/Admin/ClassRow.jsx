import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useAllClasses } from "../../../hooks/useAllClasses";

const ClassRow = ({ item, index }) => {
  const axios = useAxiosSecure();
  const [, refetch] = useAllClasses();

  const handleAprove = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to aprove this class",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, aprove it!",
    }).then((result) => {
      const update = async () => {
        const { data } = await axios.post(`/allclasses/${item?._id}`, {
          status: "active",
        });

        if (data.acknowledged) {
          refetch();
          Swal.fire("Aproved!", "The class has been Aproved.", "success");
        }
      };

      if (result.isConfirmed) {
        update();
      }
    });
  };
  const handleDeny = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to deny this class",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, deny it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { value: text } = await Swal.fire({
          input: "textarea",

          inputLabel: "Feedback message",
          inputPlaceholder: "Type your feedback message here...",
          inputAttributes: {
            "aria-label": "Type your feedback message here",
          },
          inputValidator: (value) => {
            return new Promise((resolve) => {
              if (value.trim("") === "") {
                resolve("Input cannot be empty!)");
              } else {
                resolve();
              }
            });
          },
          showCancelButton: true,
        });

        if (text) {
          try {
            const { data } = await axios.post(`/allclasses/${item?._id}`, {
              status: "denied",
              feedback: text,
            });

            if (data.acknowledged) {
              refetch();
              Swal.fire("Denied!", "The class has been Denied.", "success");
            }
          } catch (error) {
            Swal.fire("Eorror!", `${error.message}`, "error");
          }
        }
      }
    });
  };

  return (
    <tr>
      <th>{index + 1}</th>
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img src={item?.image} alt={item?.name} />
            </div>
          </div>
          <div>
            <div className="font-bold line-clamp-1">{item?.name}</div>
            <div className="text-sm opacity-50">Enrolled: {item?.enrolled}</div>
          </div>
        </div>
      </td>
      <td>
        {item?.instructorName}
        <br />
        <span className="badge badge-ghost badge-sm">
          {item?.instructorEmail}
        </span>
      </td>
      <td>{item?.seats}</td>
      <td>${item?.price}</td>
      <td>
        <span className="capitalize">
          {item?.status === "pending" ? (
            <div className="flex gap-1 items-center">
              <button onClick={handleAprove} className="btn btn-sm btn-success">
                Aprove
              </button>
              <button onClick={handleDeny} className="btn btn-sm btn-error">
                Deny
              </button>
            </div>
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
    </tr>
  );
};

export default ClassRow;
