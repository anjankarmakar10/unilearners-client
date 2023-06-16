import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

export const useMyclasses = () => {
  const axios = useAxiosSecure();

  const getData = async () => {
    const { data } = await axios.get(`/myclasses`);
    return data;
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["myclasses"],
    queryFn: getData,
  });

  return [data, refetch, isLoading];
};
