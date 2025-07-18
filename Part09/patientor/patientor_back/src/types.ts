import z from "zod";
import { NewPatientSchema, EntrySchema } from "./utils";

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

// interface BaseEntry {
//   id: string;
//   description: string;
//   date: string;
//   specialist: string;
//   diagnosisCodes?: Array<Diagnosis["code"]>;
// }

// interface HealthCheckEntry extends BaseEntry {
//   type: "HealthCheck";
//   healthCheckRating: HealthCheckRating;
// }

// interface HospitalEntry extends BaseEntry {
//   type: "Hospital";
//   discharge: { date: string; criteria: string };
// }

// interface OccupationalHealthcareEntry extends BaseEntry {
//   type: "OccupationalHealthcare";
//   employerName: string;
//   sickLeave?: { startDate: string; endDate: string };
// }

export type Entry = z.infer<typeof EntrySchema>;

export type NewPatient = z.infer<typeof NewPatientSchema>;
export interface Patient extends NewPatient {
  id: string;
}

export type PatientMasked = Omit<Patient, "ssn" | "entries">;
