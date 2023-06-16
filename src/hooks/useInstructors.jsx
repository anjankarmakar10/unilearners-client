import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useInstructors = () => {
  const getData = async () => {
    const { data } = await axios.get(
      "https://unilearners-server.vercel.app/instructors"
    );
    return data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["instructors"],
    queryFn: getData,
  });

  return [data, isLoading];
};

export default useInstructors;
