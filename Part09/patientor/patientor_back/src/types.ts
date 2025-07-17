import z from "zod";
import { NewPatientSchema } from "./utils";

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export interface Entry {
  content: string; // placeholder
}

export type NewPatient = z.infer<typeof NewPatientSchema>;
export interface Patient extends NewPatient {
  id: string;
}

export type PatientMasked = Omit<Patient, "ssn" | "entries">;
