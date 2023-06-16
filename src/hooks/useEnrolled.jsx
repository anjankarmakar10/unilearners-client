import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

export const useEnrolled = () => {
  const axios = useAxiosSecure();

  const getData = async () => {
    const { data } = await axios.get(`/enrolled`);
    return data;
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["enrolled"],
    queryFn: getData,
  });

  return [data, refetch, isLoading];
};
