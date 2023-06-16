import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

export const useAllClasses = (filter = "") => {
  const axios = useAxiosSecure();

  const getData = async () => {
    const { data } = await axios.get(`/allclasses?status=${filter}`);
    return data;
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["allclasses", filter],
    queryFn: getData,
  });

  return [data, refetch, isLoading];
};
