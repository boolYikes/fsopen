// business logic services
import diagData from "../../data/diagnoses";
import { Diagnosis } from "../types";

const diagnoses: Diagnosis[] = diagData;

// getAll
const getEntries = (): Diagnosis[] => {
  return diagnoses;
};

const addDiagnosis = () => {
  return null;
};

export default {
  getEntries,
  addDiagnosis,
};
