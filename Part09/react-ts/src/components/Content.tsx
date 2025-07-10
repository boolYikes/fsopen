import type { JSX } from "react";

type CoursePart = {
  name: string;
  exerciseCount: number;
};

interface ContentProps {
  courseParts: CoursePart[];
}

const Content = (props: ContentProps): JSX.Element => {
  if (!props.courseParts) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3>Courses, exercise counts</h3>
      {props.courseParts.map((cp) => {
        return (
          <p key={cp.name}>
            {cp.name}: {cp.exerciseCount}
          </p>
        );
      })}
    </div>
  );
};

export default Content;
