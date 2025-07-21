import z from "zod";
import {
  NewPatientSchema,
  EntrySchema,
  HealthCheckEntrySchema,
  HospitalEntrySchema,
  OccupationalHealthcareEntrySchema,
} from "./utils";

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

// export type NewEntry = Entry extends unknown ? Omit<Entry, "id"> : never;
export type NewEntry =
  | Omit<z.infer<typeof HealthCheckEntrySchema>, "id">
  | Omit<z.infer<typeof HospitalEntrySchema>, "id">
  | Omit<z.infer<typeof OccupationalHealthcareEntrySchema>, "id">;
