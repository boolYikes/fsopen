import { OccupationalHealthcareEntry } from "../../types";
import "./entryTables.css";

const OccHCEntryDetails: React.FC<{ entry: OccupationalHealthcareEntry }> = ({
  entry,
}) => {
  return (
    <>
      <tr>
        <th>date</th>
        <td>{entry.date}</td>
      </tr>
      <tr>
        <th>description</th>
        <td>{entry.description}</td>
      </tr>
      <tr>
        <th>specialist</th>
        <td>{entry.specialist}</td>
      </tr>
      <tr>
        <th>diagnoses</th>
        <td>{entry.diagnosisCodes && entry.diagnosisCodes.join(", ")}</td>
      </tr>
      <tr>
        <th>type</th>
        <td>{entry.type}</td>
      </tr>
      <tr>
        <th>employer</th>
        <td>{entry.employerName}</td>
      </tr>
      <tr>
        <th>sick leave</th>
        <td>starts: {entry.sickLeave ? entry.sickLeave.startDate : "n/a"}</td>
      </tr>
      <tr>
        <th>sick leave</th>
        <td>ends: {entry.sickLeave ? entry.sickLeave.endDate : "n/a"}</td>
      </tr>
    </>
  );
};

export default OccHCEntryDetails;
