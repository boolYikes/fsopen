import { HealthCheckEntry } from "../../types";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { assertNever } from "../../utils";
import { HealthCheckRating } from "../../types";
import "./entryTables.css";

const HealthCheckEntryDetails: React.FC<{ entry: HealthCheckEntry }> = ({
  entry,
}) => {
  const healthIconStyle = {
    color: "",
    text: "",
  };
  switch (entry.healthCheckRating) {
    case HealthCheckRating.Healthy:
      healthIconStyle.color = "green";
      healthIconStyle.text = "Healthy";
      break;
    case HealthCheckRating.LowRisk:
      healthIconStyle.color = "#DAA520";
      healthIconStyle.text = "Low risk";
      break;
    case HealthCheckRating.HighRisk:
      healthIconStyle.color = "orange";
      healthIconStyle.text = "High risk";
      break;
    case HealthCheckRating.CriticalRisk:
      healthIconStyle.color = "red";
      healthIconStyle.text = "Critical risk";
      break;
    default:
      return assertNever(entry.healthCheckRating);
  }

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
        <th>
          <span style={{ color: healthIconStyle.color }}>
            {healthIconStyle.text}
          </span>
        </th>
        <td>
          <FavoriteIcon
            style={{ color: healthIconStyle.color, display: "block" }}
          />
        </td>
      </tr>
    </>
  );
};

export default HealthCheckEntryDetails;
