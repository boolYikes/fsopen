import { HospitalEntry } from "../../types";
import "./entryTables.css";

const HospitalEntryDetails: React.FC<{ entry: HospitalEntry }> = ({
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
        <th>discharge</th>
        <td>
          <p>{entry.discharge.date}</p>
          <p>{entry.discharge.criteria}</p>
        </td>
      </tr>
    </>
  );
};

export default HospitalEntryDetails;
