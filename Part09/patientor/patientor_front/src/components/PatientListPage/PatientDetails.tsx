import type { Individual } from "../../types";
import { Gender } from "../../types";
import EntryDetails from "./EntryDetails";

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
            <table>
              <tbody>
                <EntryDetails entry={entry} />
              </tbody>
            </table>
            <hr />
          </div>
        );
      })}
      <h3>Diagnosis</h3>
      {props.diags?.map((diag) => {
        return (
          <div key={diag.code}>
            {diag.code}: {diag.name}
          </div>
        );
      })}
    </div>
  );
};

export default PatientDetails;
