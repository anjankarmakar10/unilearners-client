import { Link } from "react-router-dom";

const EnrolledItem = ({ item }) => {
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
      </div>
    </div>
  );
};

export default EnrolledItem;
