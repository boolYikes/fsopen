import type { JSX } from "react";

interface TotalProps {
  total: number;
}

const Total = (props: TotalProps): JSX.Element => {
  if (!props.total) {
    return <div>Loading?</div>;
  }

  return (
    <div>
      <p>Number of exercises {props.total}</p>
    </div>
  );
};

export default Total;
