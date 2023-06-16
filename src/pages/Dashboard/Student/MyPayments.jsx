import React from "react";
import { usePayments } from "../../../hooks/usePayments";
import getDate from "../../../utils/getDate";

const MyPayments = () => {
  const [data] = usePayments();

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
          <h3 className="font-bold">Total payments : {data?.length}</h3>
        </div>
      </div>
      <div>
        <section className="px-4 py-8 overflow-x-auto">
          <table className="table ">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>Price</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((payment, index) => (
                <tr key={payment?._id}>
                  <th>{index + 1}</th>
                  <td>{payment?.name}</td>
                  <td>{payment?.email}</td>
                  <td>${payment?.price}</td>
                  <td>{getDate(payment?.date)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </>
  );
};

export default MyPayments;
