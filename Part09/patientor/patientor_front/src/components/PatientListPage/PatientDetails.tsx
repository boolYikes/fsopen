import type { Individual } from "../../types";
import { Gender } from "../../types";

const PatientDetails = (props: Individual) => {
  let genderSymbol = "";

  if (!props) {
    return <div>No such patient</div>;
  }

  switch (props.gender) {
    case Gender.Male:
      genderSymbol = "\u2642";
      break;
    case Gender.Female:
      genderSymbol = "\u2640";
      break;
    case Gender.Other:
      genderSymbol = "\u2605";
      break;
    default:
      genderSymbol = "\u003F";
      break;
  }

  return (
    <div>
      <h3>
        {props.name} {genderSymbol}
      </h3>
      <p>ssn: {props.ssn}</p>
      <p>occupation: {props.occupation}</p>
    </div>
  );
};

export default PatientDetails;
