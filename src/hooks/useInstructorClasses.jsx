import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useInstructorClasses = (email) => {
  const getData = async () => {
    const { data } = await axios.get(
      `https://unilearners-server.vercel.app/instructor-classes/${email}`
    );
    return data;
  };

  const { data: items = [], isLoading } = useQuery({
    queryKey: ["instructor-classes"],
    queryFn: getData,
  });

  return [items, isLoading];
};

export default useInstructorClasses;
