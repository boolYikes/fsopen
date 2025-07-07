import patientData from "../../data/patients";
import { Patient, PatientSSNExcluded } from "../types";

const patients: Patient[] = patientData;

// getAll
const getPatients = (): Patient[] => {
  return patients;
};

// Does not actually enforce the return data
const getSSNOmitted = (): PatientSSNExcluded[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = () => {
  return null;
};

export default {
  getPatients,
  addPatient,
  getSSNOmitted,
};
