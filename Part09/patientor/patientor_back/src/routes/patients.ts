import express, { Request, Response } from "express";
import type {
  NewEntry,
  Entry,
  NewPatient,
  Patient,
  PatientMasked,
} from "../types";
import patientService from "../services/patientService";
import {
  errorMiddleware,
  newEntryParser,
  newPatientParser,
} from "../middlewares";

const router = express.Router();

// GETs
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

// POSTs
router.post(
  "/",
  newPatientParser,
  (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
    const addedPatient = patientService.addPatient(req.body);
    res.json(addedPatient);
  }
);

router.post(
  "/:id/entries",
  newEntryParser,
  (req: Request<{ id: string }, unknown, NewEntry>, res: Response<Entry>) => {
    const payload: NewEntry = req.body;
    const result: Entry = patientService.addEntry(req.params.id, payload);
    res.status(201).json(result);
  }
);

router.use(errorMiddleware);

export default router;
