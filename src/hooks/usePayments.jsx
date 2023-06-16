import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

export const usePayments = () => {
  const axios = useAxiosSecure();

  const getData = async () => {
    const { data } = await axios.get(`/payments`);
    return data;
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["payments"],
    queryFn: getData,
  });

  return [data, refetch, isLoading];
};
