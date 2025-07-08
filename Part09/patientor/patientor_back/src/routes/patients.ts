import express from "express";
import { Response } from "express";
import { PatientSSNExcluded } from "../types";
import patientService from "../services/patientService";

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

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
router.post("/", (req, res) => {
  const { name, ssn, dateOfBirth, occupation, gender } = req.body;
  const addedPatient = patientService.addPatient({
    name,
    ssn,
    dateOfBirth,
    occupation,
    gender,
  });
  res.json(addedPatient);
});

export default router;
