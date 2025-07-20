import type { Entry } from "../../types";
import HealthCheckEntryDetails from "./HealthCheckEntryDetails";
import HospitalEntryDetails from "./HospitalEntryDetails";
import OccHCEntryDetails from "./OccHCEntryDetails";
import { assertNever } from "../../utils";
import { EntryType } from "../../types";

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case EntryType.Hospital:
      return <HospitalEntryDetails entry={entry} />;
    case EntryType.OccupationalHealthcare:
      return <OccHCEntryDetails entry={entry} />;
    case EntryType.HealthCheck:
      return <HealthCheckEntryDetails entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
