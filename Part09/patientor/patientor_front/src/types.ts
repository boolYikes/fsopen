export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

export enum EntryType {
  HealthCheck = "HealthCheck",
  OccupationalHealthcare = "OccupationalHealthcare",
  Hospital = "Hospital",
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis["code"]>;
}

export interface HealthCheckEntry extends BaseEntry {
  type: string;
  healthCheckRating: number;
}

export interface HospitalEntry extends BaseEntry {
  type: string;
  discharge: { date: string; criteria: string };
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: string;
  employerName: string;
  sickLeave: { startDate: string; endDate: string };
}

export type Entry =
  | OccupationalHealthcareEntry
  | HospitalEntry
  | HealthCheckEntry;

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn: string;
  dateOfBirth?: string;
  entries: Entry[];
}

export type PatientSpecificDiags = { diags: Diagnosis[] };

export type PatientFormValues = Omit<Patient, "id" | "entries">;
export type Individual = Omit<Patient, "dateOfBirth"> & PatientSpecificDiags;

export type EntryFormValues =
  | Omit<OccupationalHealthcareEntry, "id">
  | Omit<HospitalEntry, "id">
  | Omit<HealthCheckEntry, "id">;

export type EntryFromProps = {
  id: string;
  onAddEntry: (id: string, entry: Entry) => void;
  notify: React.Dispatch<
    React.SetStateAction<{
      type: string;
      message: string;
    }>
  >;
  diags: Diagnosis[];
};
