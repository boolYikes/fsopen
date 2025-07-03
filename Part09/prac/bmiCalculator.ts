import { argParse } from "./helper";

type BMIResult = number | string;

const getBMI = (weight: number, height: number): BMIResult => {
  const bmi = weight / (height / 100) ** 2;
  let result: string;
  if (bmi >= 30) {
    result = "Obese";
  } else if (bmi < 25) {
    result = "Normal";
  } else {
    result = "Overweight";
  }
  return `${result} range`;
};

try {
  const parseResult = argParse(process.argv);
  if ("weight" in parseResult) {
    // another narrowing
    const { weight, height } = parseResult;
    console.log(getBMI(weight, height));
  } else {
    throw new Error("What could possibly have gone wrong?");
  }
} catch (error: unknown) {
  let errorMessage = "Nooooo";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
