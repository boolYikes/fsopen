interface TrainingInput {
  dailyHours: number[];
  target: number;
}

interface BMIInput {
  weight: number;
  height: number;
}

type ParseResult = TrainingInput | BMIInput;

export const argParse = (args: string[]): ParseResult => {
  if (args.length < 4) throw new Error("Not enough args");
  if (args.length > 4) throw new Error("Too many args");

  if (args[1].includes("bmi")) {
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
      return {
        weight: Number(args[2]),
        height: Number(args[3]),
      };
    } else {
      throw new Error("Not valid numbers");
    }
  } else {
    const parsed = JSON.parse(args[2]) as number[];
    if (Array.isArray(parsed) && !isNaN(Number(args[3]))) {
      return {
        dailyHours: parsed,
        target: Number(args[3]),
      };
    } else {
      throw new Error("Arguments not valid");
    }
  }
};
