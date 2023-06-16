import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const usePopulars = () => {
  const getData = async () => {
    const { data } = await axios.get(
      "https://unilearners-server.vercel.app/popular-classes"
    );
    return data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["popular-classes"],
    queryFn: getData,
  });

  return [data, isLoading];
};

export default usePopulars;
