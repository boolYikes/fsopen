import express from "express";
import { Response } from "express";
import { PatientSSNExcluded } from "../types";
import patientService from "../services/patientService";
import validateRequest from "../utils";

const router = express.Router();

router.get("/", (_req, res: Response<PatientSSNExcluded[]>) => {
  const allPatients = patientService.getSSNOmitted();
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

router.post("/", (req, res) => {
  try {
    const validated = validateRequest(req.body);
    const addedPatient = patientService.addPatient(validated);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = "No";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
