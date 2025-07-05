import { argParse } from "./helper";

interface TrainingEval {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (
  dailyHoursInAWeek: number[],
  target: number
): TrainingEval => {
  const evalResult = {
    periodLength: 0,
    trainingDays: 0,
    success: false,
    rating: 0,
    ratingDescription: "",
    target: target,
    average: 0,
  };
  let sum = 0;

  // Going for O(n)
  for (const hour of dailyHoursInAWeek) {
    evalResult.periodLength += 1;
    evalResult.trainingDays += hour !== 0 ? 1 : 0;
    sum += hour;
  }

  evalResult.average = sum / evalResult.periodLength;
  evalResult.success = evalResult.average >= target;
  // Rating metrics
  // percentage of training days over the week > 0.7 -> 1
  // percentage of daily hours/target hours > 0.7 -> 1
  // target reached == true -> 1
  evalResult.rating =
    Number(evalResult.trainingDays / evalResult.periodLength > 0.7) +
    Number(evalResult.average / evalResult.target > 0.7) +
    Number(evalResult.success);
  const evalDict = [
    "Do you even breath?",
    "Barely made it...",
    "Can do better than that.",
    "You are so buff.",
  ];
  evalResult.ratingDescription = evalDict[evalResult.rating];

  return evalResult;
};

if (require.main === module) {
  try {
    const parseResult = argParse(process.argv);
    if ("daily_exercises" in parseResult) {
      const { daily_exercises, target } = parseResult;
      console.log(calculateExercises(daily_exercises, target));
    } else {
      throw new Error("This cannot happen");
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
}
