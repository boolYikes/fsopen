import express from "express";
import cors from "cors";
import diagRouter from "./routes/diagnoses";
import patientRouter from "./routes/patients";

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

const PORT = 3001;

// app.use((req, _res, next) => {
//   console.log(`[${req.method}] ${req.url}`);
//   next();
// });

app.use("/api/diagnoses", diagRouter);
app.use("/api/patients", patientRouter);

app.get("/api/ping", (_req, res) => {
  console.log("pingpingping");
  res.status(200).send("pongpongpong");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Running on port ${PORT}`);
});
