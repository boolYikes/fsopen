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
      <h3>Entires</h3>
      <hr />
      {props.entries?.map((entry) => {
        return (
          <div key={entry.id}>
            <p>date: {entry.date}</p>
            <p>description: {entry.description}</p>
            <h4>diagnosis</h4>
            {props.diags?.map((diag) => {
              return (
                <div key={diag.code}>
                  {diag.code}: {diag.name}
                </div>
              );
            })}
            <hr />
          </div>
        );
      })}
    </div>
  );
};

export default PatientDetails;
