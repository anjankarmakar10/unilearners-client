import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../contexts/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";

export const useRole = () => {
  const { user, loading } = useAuth();
  const axios = useAxiosSecure();
  const email = user?.email;

  const getData = async () => {
    const { data } = await axios.get(`/users/role/${email}`);
    return data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["role", email],
    queryFn: getData,
    enabled: !loading,
  });

  return [data, isLoading];
};
