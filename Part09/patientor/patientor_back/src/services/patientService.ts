import patientData from "../../data/patients";
import { Patient, PatientMasked, NewPatient, NewEntry, Entry } from "../types";
import { v1 as uuid } from "uuid";
import { EntryType } from "../enum";
import {
  isHealthCheck,
  isHospital,
  isOccupational,
  parseDiagnosisCodes,
} from "../utils";

const patients: Patient[] = patientData;

// getAll
const getPatients = (): Patient[] => {
  return patients;
};

// Does not actually enforce the return data
const getSSNOmitted = (): PatientMasked[] => {
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

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient,
  };
  patients.push(newPatient);

  return newPatient;
};

const addEntry = (id: string, entry: NewEntry): Entry => {
  const base = {
    id: uuid(),
    date: entry.date,
    description: entry.description,
    specialist: entry.specialist,
    diagnosisCodes: parseDiagnosisCodes(entry),
  };

  let newEntry: Entry;

  if (isHealthCheck(entry)) {
    newEntry = {
      ...base,
      type: EntryType.HealthCheck,
      healthCheckRating: entry.healthCheckRating,
    };
  } else if (isHospital(entry)) {
    newEntry = {
      ...base,
      type: EntryType.Hospital,
      discharge: entry.discharge,
    };
  } else if (isOccupational(entry)) {
    newEntry = {
      ...base,
      type: EntryType.OccupationalHealthcare,
      employerName: entry.employerName,
      sickLeave: entry.sickLeave,
    };
  } else {
    throw new Error("Unhandled entry type");
  }

  // const newEntry: Entry = {
  //   id: uuid(),
  //   ...entry, // SPREADING DOES NOT GUARANTEE UNION INCLUSION????

  patients.map((p) => {
    if (p.id === id) {
      p.entries.push(newEntry);
    }
  });

  return newEntry;
};

export default {
  getPatients,
  addPatient,
  getSSNOmitted,
  findById,
  addEntry,
};
