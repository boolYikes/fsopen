import express from "express";

// these are functions. To import as a default or named?
// the latter makes more sense...?
import getBMI from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();
app.use(express.json());

/*
Usage:
```
curl -i -X POST http://localhost:3003/exercises -H 'Content-Type: application/json' -d '{"daily_exercises": "[1,2,3]", "target": "2"}'
```
...or just use postman :P
*/
app.post("/exercises", (req, res) => {
  const { daily_exercises, target } = req.body as {
    daily_exercises: string;
    target: string;
  };
  if (!daily_exercises || !target) {
    console.log("no arg given");
    res.setHeader("Content-Type", "application/json");
    res.status(400).end(
      JSON.stringify({
        error: "parameter missing",
      })
    );
    return;
  }

  // this doesn't check malformed syntax like "[1,2"
  // but if you use logic for filtering malformation out, it would be included in the compilation result?
  const hoursArr = JSON.parse(daily_exercises) as number[];
  const targetNum = Number(target);

  // It only checks logically but does not actually narrow types down. probably need a function that returns some sort of 'narrowed down object'
  if (
    Array.isArray(hoursArr) &&
    hoursArr.every((thing) => typeof thing === "number" && !Number.isNaN(thing))
  ) {
    const result = calculateExercises(hoursArr, targetNum);
    // eslint-disable-next-line @typescript-eslint/no-base-to-string
    console.log(`yap result: ${result}`);
    res.status(200).json(result);
  } else {
    console.log("args invalid");
    res.setHeader("Content-Type", "application/json");
    res.status(400).end(
      JSON.stringify({
        message: "malformatted parameters",
      })
    );
    return;
  }
});

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
