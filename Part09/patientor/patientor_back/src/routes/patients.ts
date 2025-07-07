import express from "express";
import { Response } from "express";
import { PatientSSNExcluded } from "../types";
import patientService from "../services/patientService";

const router = express.Router();

router.get("/", (_req, res: Response<PatientSSNExcluded[]>) => {
  const allPatients = patientService.getSSNOmitted();
  res.status(200).json(allPatients);
});

router.post("/", (_req, res) => {
  res.send("saved patient");
});

export default router;
