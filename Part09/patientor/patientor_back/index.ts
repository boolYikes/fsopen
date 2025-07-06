import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;

app.get("/api/ping", (_req, res) => {
  console.log("pingpingping");
  res.status(200).send("pongpongpong");
});

app.get("/api/patients", (_req, res) => {
  const patients_placeholder = [
    {
      id: "abc",
      name: "noname",
      occupation: "good boy",
      gender: "male",
      ssn: "yap",
      dateOfBirth: "2002-12-12",
    },
  ];
  res.status(200).json(patients_placeholder);
});

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
