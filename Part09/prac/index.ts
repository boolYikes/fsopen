import express from "express";
import getBMI from "./bmiCalculator";

const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const weight = req.query.weight as string | undefined;
  const height = req.query.height as string | undefined;
  if (!weight || !height) {
    res.status(400).json({
      error: "Bad request",
      message: "Missing required parameters: either 'weight' or 'height'",
    });
  }

  const wNum = Number(weight);
  const hNum = Number(height);

  if (isNaN(wNum) || isNaN(hNum)) {
    res.status(400).json({
      error: "Bad request",
      message: "Arguments must be valid numbers",
    });
  }

  const result = {
    weight: wNum,
    height: hNum,
    bmi: getBMI(wNum, hNum),
  };
  res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
