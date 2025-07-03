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

console.log(getBMI(180, 74));
