import express from "express";
import getBMI from "./bmiCalculator";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const weight = req.query.weight as string | undefined; // needs narrowing later
  const height = req.query.height as string | undefined;
  if (!weight || !height) {
    console.log("no arg");
    res.setHeader("Content-Type", "application/json");
    res.status(400).end(
      JSON.stringify({
        error: "Bad request",
        message: "Missing required parameters: either 'weight' or 'height'",
      })
    );
    return;
  }
  const wNum = Number(weight);
  const hNum = Number(height);

  if (isNaN(wNum) || isNaN(hNum)) {
    console.log("args nan");
    res.setHeader("Content-Type", "application/json");
    res.status(400).end(
      JSON.stringify({
        error: "Bad request",
        message: "Arguments must be valid numbers",
      })
    );
    return;
  }

  const result = {
    weight: wNum,
    height: hNum,
    bmi: getBMI(wNum, hNum),
  };
  console.log("200 res");
  res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
