import patientData from "../../data/patients";
import { Patient, PatientSSNExcluded, NewPatient } from "../types";
import { v1 as uuid } from "uuid";

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

const findById = (id: string): Patient | undefined => {
  const patient = patients.find((p) => p.id === id);
  return patient;
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...entry,
  };
  patients.push(newPatient);

  return newPatient;
};

export default {
  getPatients,
  addPatient,
  getSSNOmitted,
  findById,
};
