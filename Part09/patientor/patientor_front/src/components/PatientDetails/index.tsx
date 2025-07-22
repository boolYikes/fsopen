import { Typography } from "@mui/material";
import type { Entry, Individual } from "../../types";
import { Gender } from "../../types";
import EntryDetails from "./EntryDetails";
import EntryForm from "./EntryForm";

const PatientDetails = ({
  patientToShow,
  onAddEntry,
  notify,
}: {
  patientToShow: Individual;
  onAddEntry: (id: string, newEntry: Entry) => void;
  notify: React.Dispatch<
    React.SetStateAction<{
      type: string;
      message: string;
    }>
  >;
}) => {
  let genderSymbol = "";

  if (!patientToShow) {
    return <div>No such patient</div>;
  }

  switch (patientToShow.gender) {
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
        {patientToShow.name} {genderSymbol}
      </h3>
      <Typography>ssn: {patientToShow.ssn}</Typography>
      <Typography>occupation: {patientToShow.occupation}</Typography>
      <EntryForm
        id={patientToShow.id}
        onAddEntry={onAddEntry}
        notify={notify}
      />
      <h3>Entires</h3>
      <hr />
      {patientToShow.entries?.map((entry) => {
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
      {patientToShow.diags?.map((diag) => {
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
