import express, { NextFunction, Request, Response } from "express";
import type { NewPatient, Patient, PatientMasked } from "../types";
import patientService from "../services/patientService";
import { NewPatientSchema } from "../utils";
import z from "zod";

const router = express.Router();

router.get("/", (_req, res: Response<PatientMasked[]>) => {
  const allPatients = patientService.getPatients();
  res.status(200).json(allPatients);
});

router.get("/:id", (req, res) => {
  const patient = patientService.findById(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

// middleware... in a separate file?
const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};
const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};
router.post(
  "/",
  newPatientParser,
  (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
    const addedPatient = patientService.addPatient(req.body);
    res.json(addedPatient);
  }
);

router.use(errorMiddleware);

export default router;
