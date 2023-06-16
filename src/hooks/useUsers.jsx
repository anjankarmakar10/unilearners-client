import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

export const useUsers = (role = "") => {
  const axios = useAxiosSecure();

  const getData = async () => {
    const { data } = await axios.get(`/users?role=${role}`);
    return data;
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["users", role],
    queryFn: getData,
  });

  return [data, refetch, isLoading];
};
