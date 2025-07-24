import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import patientService from "../../services/patients";
import {
  Diagnosis,
  EntryFormValues,
  EntryFromProps,
  EntryType,
  HealthCheckRating,
} from "../../types";

const EntryForm: React.FC<EntryFromProps> = ({
  id,
  onAddEntry,
  notify,
  diags,
}) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [healthRating, setHealthRating] = useState(0);
  const [diagCodes, setDiagCodes] = useState<Array<Diagnosis["code"]>>([]); // must validate
  // const [diagCode, setDiagCode] = useState("");
  const [entryType, setEntryType] = useState(EntryType.HealthCheck);
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");
  const [employer, setEmployer] = useState("");
  const [leaveStart, setLeaveStart] = useState("");
  const [leaveEnd, setLeaveEnd] = useState("");

  const isRating = (val: number): val is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(val as HealthCheckRating);
  };
  // const isEntryType = (val: string): val is EntryType => {
  //   return Object.values(EntryType).includes(val as EntryType);
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const basePayload = {
      description,
      date,
      specialist,
      diagnosisCodes: diagCodes,
      type: entryType,
    };
    let payload: EntryFormValues;
    switch (entryType) {
      case EntryType.HealthCheck:
        payload = {
          ...basePayload,
          healthCheckRating: healthRating,
        };
        break;
      case EntryType.Hospital:
        payload = {
          ...basePayload,
          discharge: { date: dischargeDate, criteria: dischargeCriteria },
        };
        break;
      case EntryType.OccupationalHealthcare:
        payload = {
          ...basePayload,
          employerName: employer,
          sickLeave: { startDate: leaveStart, endDate: leaveEnd },
        };
    }
    try {
      const result = await patientService.addEntry(id, payload);
      onAddEntry(id, result);
      setDescription("");
      setDate("");
      setSpecialist("");
      setDiagCodes([]);
      // setDiagCode("");
      setEntryType(EntryType.HealthCheck);
      setHealthRating(HealthCheckRating.Healthy);
      setDischargeDate("");
      setDischargeCriteria("");
      setEmployer("");
      setLeaveStart("");
      setLeaveEnd("");
      notify({ type: "success", message: "Successfully added!" });
      setTimeout(() => {
        notify({ type: "", message: "" });
      }, 5000);
    } catch (error) {
      if (error instanceof Error) {
        notify({ type: "error", message: "An error occurred!" });
        setTimeout(() => {
          notify({ type: "", message: "" });
        }, 5000);
      }
    }
  };

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 48 * 4.5 + 8,
        width: 250,
      },
    },
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ border: "1px dotted gray", p: 2 }}
    >
      <Typography variant="h6">New HealthCheck entry</Typography>
      <TextField
        label="Description"
        name="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        variant="standard"
        margin="dense"
      />
      <TextField
        label="Date"
        type="date"
        name="Date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        margin="dense"
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Specialist"
        name="Specialist"
        value={specialist}
        onChange={(e) => setSpecialist(e.target.value)}
        fullWidth
        variant="standard"
        margin="dense"
      />
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="diagCodes-label" shrink>
          Diagnosis codes
        </InputLabel>
        <Select
          labelId="diagCodes-label"
          id="diagCodes"
          multiple
          value={diagCodes}
          onChange={(e) => {
            const val = e.target.value;
            setDiagCodes(
              // On autofill we get a stringified value.
              typeof val === "string" ? val.split(",") : val
            );
          }}
          input={<OutlinedInput label="diagCodes" />}
          MenuProps={MenuProps}
        >
          {diags.map((diag) => (
            <MenuItem key={diag.code} value={diag.code}>
              {diag.code}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* <TextField
        label={diagCodes.join(" ")}
        name="Diagnoses Codes"
        value={diagCode}
        onChange={(e) => {
          if (e.target.value[e.target.value.length - 1] === " ") {
            const newCodes = diagCodes.concat(e.target.value);
            setDiagCodes(newCodes);
            setDiagCode("");
          } else {
            setDiagCode(e.target.value);
          }
        }}
        fullWidth
        variant="standard"
        margin="dense"
        placeholder="Diagnosis codes: Use the Space key at the end of each code"
      /> */}
      <br />
      <FormLabel>Choose an entry type</FormLabel>
      {/* On change must reset other entry type inputs in case the user changes mind mid-input */}
      <RadioGroup
        value={entryType}
        onChange={(e) => setEntryType(e.target.value as EntryType)}
        sx={{ display: "flex", flexDirection: "row" }}
      >
        <FormControlLabel
          value={EntryType.HealthCheck}
          control={<Radio />}
          label={EntryType.HealthCheck}
        />
        <FormControlLabel
          value={EntryType.Hospital}
          control={<Radio />}
          label={EntryType.Hospital}
        />
        <FormControlLabel
          value={EntryType.OccupationalHealthcare}
          control={<Radio />}
          label={EntryType.OccupationalHealthcare}
        />
      </RadioGroup>

      {entryType === EntryType.HealthCheck && (
        <>
          <FormLabel>Choose health check rating</FormLabel>
          <RadioGroup
            value={healthRating}
            onChange={(e) => {
              const target = parseInt(e.target.value);
              if (isRating(target)) {
                setHealthRating(target);
              }
            }}
            sx={{ display: "flex", flexDirection: "row" }}
          >
            <FormControlLabel
              value={HealthCheckRating.Healthy}
              control={<Radio />}
              label={HealthCheckRating.Healthy}
            />
            <FormControlLabel
              value={HealthCheckRating.LowRisk}
              control={<Radio />}
              label={HealthCheckRating.LowRisk}
            />
            <FormControlLabel
              value={HealthCheckRating.HighRisk}
              control={<Radio />}
              label={HealthCheckRating.HighRisk}
            />
            <FormControlLabel
              value={HealthCheckRating.CriticalRisk}
              control={<Radio />}
              label={HealthCheckRating.CriticalRisk}
            />
          </RadioGroup>
        </>
      )}

      {entryType === EntryType.Hospital && (
        <>
          <TextField
            label="Discharge date"
            type="date"
            value={dischargeDate}
            onChange={(e) => setDischargeDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            margin="dense"
          />
          <TextField
            label="Discharge criteria"
            value={dischargeCriteria}
            onChange={(e) => setDischargeCriteria(e.target.value)}
            fullWidth
            variant="standard"
            margin="dense"
          />
        </>
      )}

      {entryType === EntryType.OccupationalHealthcare && (
        <>
          <TextField
            label="Employer"
            value={employer}
            onChange={(e) => setEmployer(e.target.value)}
            fullWidth
            variant="standard"
            margin="dense"
          />
          <TextField
            label="Sick leave start"
            type="date"
            value={leaveStart}
            onChange={(e) => setLeaveStart(e.target.value)}
            margin="dense"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Sick leave end"
            type="date"
            value={leaveEnd}
            onChange={(e) => setLeaveEnd(e.target.value)}
            margin="dense"
            InputLabelProps={{ shrink: true }}
          />
        </>
      )}

      {/* Make it togglable */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "1rem",
        }}
      >
        <Button type="reset" variant="contained" color="warning">
          cancel
        </Button>
        <Button type="submit" variant="contained" color="success">
          submit
        </Button>
      </Box>
    </Box>
  );
};

export default EntryForm;
