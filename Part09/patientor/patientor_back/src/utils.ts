import { Gender } from "./enum";
import z from "zod";
import { NewPatient } from "./types";

const nameRegex = /^(?!.*(--|''))[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/;
const ssnRegex = /^(?!.*--)[0-9A-Z-]+$/;
export const NewPatientSchema = z.object({
  name: z.string().min(3).regex(nameRegex),
  ssn: z.string().min(3).regex(ssnRegex),
  dateOfBirth: z.string().date(),
  occupation: z.string(),
  gender: z.nativeEnum(Gender),
});

export const validateNewPatient = (obj: unknown): NewPatient => {
  return NewPatientSchema.parse(obj);
};
