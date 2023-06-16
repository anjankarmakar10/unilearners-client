import axios from "axios";

const addUser = async (newUser) => {
  const { data } = await axios.post(
    "https://unilearners-server.vercel.app/users",
    newUser
  );
  return data;
};

export default addUser;
