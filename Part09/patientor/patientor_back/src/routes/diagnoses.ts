import express from "express";
import diagService from "../services/diagService";

const router = express.Router();

router.get("/", (_req, res) => {
  const allEntires = diagService.getEntries();
  res.status(200).json(allEntires);
});

router.post("/", (_req, res) => {
  res.send("saved diag");
});

export default router;
