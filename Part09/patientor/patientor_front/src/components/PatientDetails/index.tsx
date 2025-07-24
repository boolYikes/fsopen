import { Typography } from "@mui/material";
import type { Diagnosis, Entry, Individual } from "../../types";
import { Gender } from "../../types";
import EntryDetails from "./EntryDetails";
import EntryForm from "./EntryForm";

const PatientDetails = ({
  patientToShow,
  onAddEntry,
  notify,
  diags,
}: {
  patientToShow: Individual;
  onAddEntry: (id: string, newEntry: Entry) => void;
  notify: React.Dispatch<
    React.SetStateAction<{
      type: string;
      message: string;
    }>
  >;
  diags: Diagnosis[];
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

  let diagsToShow: Array<Diagnosis> = [];
  let codes: Array<Diagnosis["code"]> = [];
  patientToShow.entries.map((entry) => {
    if (entry.diagnosisCodes) {
      codes = [...codes, ...entry.diagnosisCodes];
    }
  });
  const uniques = [...new Set(codes)];
  diagsToShow = diags.filter((diag) =>
    uniques?.find((code) => code === diag.code)
  );

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
        diags={diags}
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
      {diagsToShow?.map((diag) => {
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
