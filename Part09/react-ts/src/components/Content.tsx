import type { JSX } from "react";
import type { CoursePart } from "../types";
import Part from "./Part";
import "./Content.css";

interface ContentProps {
  courseParts: CoursePart[];
}

const Content = (props: ContentProps): JSX.Element => {
  if (!props.courseParts) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3>Courses</h3>
      <table>
        <thead>
          <tr style={{ textAlign: "end" }}>
            <th>name</th>
            <th>description</th>
            <th>exercise count</th>
            <th>group project count</th>
            <th>prerequisites</th>
            <th>background material</th>
          </tr>
        </thead>
        <tbody>
          {props.courseParts.map((cp) => {
            return <Part key={cp.name} coursePart={cp} />;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Content;
