import { Gender, HealthCheckRating, EntryType } from "./enum";
import z from "zod";
import type { NewPatient, NewEntry, Diagnosis } from "./types";

// const DiagnosisSchema = z.object({
//   code: z.string(),
//   name: z.string(),
//   latin: z.string().optional(),
// });

// ENTRY-RELATED
const BaseEntrySchema = z.object({
  id: z.string(),
  description: z.string(),
  date: z.string().date(),
  specialist: z.string(),
  // diagnosisCodes: z.array(DiagnosisSchema).optional(),
  diagnosisCodes: z.array(z.string()).optional(),
});

export const HealthCheckEntrySchema = BaseEntrySchema.extend({
  type: z.literal(EntryType.HealthCheck),
  healthCheckRating: z.nativeEnum(HealthCheckRating),
});

export const HospitalEntrySchema = BaseEntrySchema.extend({
  type: z.literal(EntryType.Hospital),
  discharge: z.object({
    date: z.string(),
    criteria: z.string(),
  }),
});

export const OccupationalHealthcareEntrySchema = BaseEntrySchema.extend({
  type: z.literal(EntryType.OccupationalHealthcare),
  employerName: z.string(),
  sickLeave: z
    .object({
      startDate: z.string(),
      endDate: z.string(),
    })
    .optional(),
});

export const EntrySchema = z.discriminatedUnion("type", [
  HealthCheckEntrySchema,
  HospitalEntrySchema,
  OccupationalHealthcareEntrySchema,
]);

// only used in the parsing middleware
export const NewEntrySchema = z.discriminatedUnion("type", [
  HealthCheckEntrySchema.omit({ id: true }),
  HospitalEntrySchema.omit({ id: true }),
  OccupationalHealthcareEntrySchema.omit({ id: true }),
]);

// PATIENT-RELATED
const nameRegex = /^(?!.*(--|''))[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/;
const ssnRegex = /^(?!.*--)[0-9A-Z-]+$/;
export const NewPatientSchema = z.object({
  name: z.string().min(3).regex(nameRegex),
  ssn: z.string().min(3).regex(ssnRegex),
  dateOfBirth: z.string().date(),
  occupation: z.string(),
  gender: z.nativeEnum(Gender),
  entries: z.array(EntrySchema),
});

export const validateNewPatient = (obj: unknown): NewPatient => {
  return NewPatientSchema.parse(obj);
};

// Entries validations
export const isHealthCheck = (
  entry: NewEntry
): entry is Extract<NewEntry, { type: EntryType.HealthCheck }> => {
  return entry.type === EntryType.HealthCheck;
};
export const isHospital = (
  entry: NewEntry
): entry is Extract<NewEntry, { type: EntryType.Hospital }> => {
  return entry.type === EntryType.Hospital;
};
export const isOccupational = (
  entry: NewEntry
): entry is Extract<NewEntry, { type: EntryType.OccupationalHealthcare }> => {
  return entry.type === EntryType.OccupationalHealthcare;
};
export const parseDiagnosisCodes = (
  object: unknown
): Array<Diagnosis["code"]> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    console.log("returning an empty array");
    return [] as Array<Diagnosis["code"]>;
  }
  return object.diagnosisCodes as Array<Diagnosis["code"]>;
};
