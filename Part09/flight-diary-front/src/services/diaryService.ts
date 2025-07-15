import axios from "axios";
import type {
  Diary,
  NewDiary,
  ValidationError,
  AddEntryResult,
} from "../types";

const baseURL = "http://localhost:3000/api/diaries";

let dataLength = 0;

const getAll = async () => {
  try {
    const result = await axios.get<Diary[]>(`${baseURL}`);
    dataLength = result.data.length;
    return result.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.status);
      console.error(error.response);
    } else {
      console.log(error);
    }
  }
};
const getInclusive = async () => {
  const result = await axios.get<Diary[]>(`${baseURL}/inclusive`);
  return result.data;
};

const addEntry = async (newDiary: NewDiary): Promise<AddEntryResult> => {
  const payload = {
    id: dataLength + 1,
    ...newDiary,
  };
  try {
    const result = await axios.post<Diary>(`${baseURL}`, payload);
    return { data: result.data };
  } catch (error) {
    if (axios.isAxiosError<ValidationError>(error)) {
      return { error: error.response?.data.message ?? "Validation failure" };
    } else {
      console.log(error);
      return { error: "Unknown error" };
    }
  }
};

export default { getAll, getInclusive, addEntry };
