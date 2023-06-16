import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../contexts/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";

export const useCarts = () => {
  const { user, loading } = useAuth();
  const axios = useAxiosSecure();
  const email = user?.email;

  const getData = async () => {
    const { data } = await axios.get(`/carts/${email}`);
    return data;
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["carts", email],
    queryFn: getData,
    enabled: !loading,
  });

  return [data, refetch, isLoading];
};
