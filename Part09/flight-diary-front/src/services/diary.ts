import axios from "axios";

const baseURL = "http://localhost:3000/api/diaries";

const getAll = async () => {
  const result = await axios.get(`${baseURL}`);
  return result.data;
};
const getInclusive = async () => {
  const result = await axios.get(`${baseURL}/inclusive`);
  return result.data;
};

export default { getAll, getInclusive };
