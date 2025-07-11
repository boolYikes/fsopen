import type { JSX } from "react";
import type { CoursePart, CoursePayload } from "../types";
import type React from "react";

interface PartProp {
  coursePart: CoursePart;
}

// enforces handling all branches in a union type!
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = (props: PartProp): JSX.Element => {
  const payload: CoursePayload = {
    name: props.coursePart.name,
    exerciseCount: props.coursePart.exerciseCount,
    description: "",
    groupProjectCount: 0,
    backgroundMaterial: "",
    requirements: [],
  };
  switch (props.coursePart.kind) {
    case "basic":
      payload.description = props.coursePart.description;
      break;
    case "group":
      payload.groupProjectCount = props.coursePart.groupProjectCount;
      break;
    case "background":
      payload.description = props.coursePart.description;
      payload.backgroundMaterial = props.coursePart.backgroundMaterial;
      break;
    case "special":
      payload.description = props.coursePart.description;
      payload.requirements = props.coursePart.requirements;
      break;
    default:
      assertNever(props.coursePart);
  }

  const rightAlign: React.CSSProperties = { textAlign: "end" };

  return (
    <tr style={rightAlign}>
      <td>{payload.name}</td>
      <td>{payload.description}</td>
      <td>{payload.exerciseCount}</td>
      <td>{payload.groupProjectCount}</td>
      <td>{payload.requirements}</td>
      <td>{payload.backgroundMaterial}</td>
    </tr>
  );
};

export default Part;
