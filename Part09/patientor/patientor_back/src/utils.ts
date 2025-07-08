import { NewPatient } from "./types";
import { Gender } from "./enum";

const patientRequestValidator = (obj: unknown): NewPatient => {
  if (!obj || typeof obj !== "object") {
    throw new Error("Input was incorrect or missing");
  }

  if (
    "name" in obj &&
    "ssn" in obj &&
    "dateOfBirth" in obj &&
    "occupation" in obj &&
    "gender" in obj
  ) {
    const newPatient: NewPatient = {
      name: parseName(obj.name),
      ssn: parseSSN(obj.ssn),
      dateOfBirth: parseDate(obj.dateOfBirth),
      occupation: parseOccupation(obj.occupation),
      gender: parseGender(obj.gender),
    };
    return newPatient;
  }

  throw new Error("Some fields were missing");
};

const parseOccupation = (occ: unknown): string => {
  if (!occ || !isString(occ)) {
    throw new Error("Occupation is required and must be a string");
  }
  return occ;
};

const parseSSN = (ssn: unknown): string => {
  if (!ssn || !isString(ssn) || !/^(?!.*--)[0-9A-Z-]+$/.test(ssn)) {
    throw new Error("Invalid social security number or no input: " + ssn);
  }
  return ssn;
};

// add no special char logic
const parseName = (name: unknown): string => {
  if (
    !name ||
    !isString(name) ||
    !/^(?!.*(--|''))[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/.test(name)
  ) {
    throw new Error("Incorrect or missing name: " + name);
  }
  return name;
};

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String; // the latter for strings made with String constructor
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error("Missing or not a valid gender: " + gender);
  }
  return gender;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

export default patientRequestValidator;
