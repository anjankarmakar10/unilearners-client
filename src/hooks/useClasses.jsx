import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useClasses = (filter) => {
  const getData = async () => {
    const { data } = await axios.get(
      `https://unilearners-server.vercel.app/classes?difficulty=${filter}`
    );
    return data;
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["classes"],
    queryFn: getData,
  });

  return [data, isLoading, refetch];
};

export default useClasses;
