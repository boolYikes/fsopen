import { Gender, HealthCheckRating, EntryType } from "./enum";
import z from "zod";
import type { NewPatient } from "./types";

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

const HealthCheckEntrySchema = BaseEntrySchema.extend({
  type: z.literal(EntryType.HealthCheck),
  healthCheckRating: z.nativeEnum(HealthCheckRating),
});

const HospitalEntrySchema = BaseEntrySchema.extend({
  type: z.literal(EntryType.Hospital),
  discharge: z.object({
    date: z.string(),
    criteria: z.string(),
  }),
});

const OccupationalHealthcareEntrySchema = BaseEntrySchema.extend({
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
