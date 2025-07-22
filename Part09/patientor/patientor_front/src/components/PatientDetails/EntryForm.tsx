import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import patientService from "../../services/patients";
import {
  Diagnosis,
  EntryFormValues,
  EntryFromProps,
  EntryType,
  HealthCheckRating,
} from "../../types";

const EntryForm: React.FC<EntryFromProps> = ({ id, onAddEntry, notify }) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [healthRating, setHealthRating] = useState("");
  const [diagCodes, setDiagCodes] = useState<Array<Diagnosis["code"]>>([]); // must validate
  const [diagCode, setDiagCode] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload: EntryFormValues = {
      description,
      date,
      specialist,
      diagnosisCodes: diagCodes,
      healthCheckRating: HealthCheckRating.Healthy,
      type: EntryType.HealthCheck,
    };
    try {
      const result = await patientService.addEntry(id, payload);
      onAddEntry(id, result);
      setDescription("");
      setDate("");
      setSpecialist("");
      setHealthRating("");
      setDiagCodes([]);
      setDiagCode("");
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
        margin="normal"
      />
      <TextField
        label="Date"
        name="Date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        fullWidth
        variant="standard"
        margin="normal"
      />
      <TextField
        label="Specialist"
        name="Specialist"
        value={specialist}
        onChange={(e) => setSpecialist(e.target.value)}
        fullWidth
        variant="standard"
        margin="normal"
      />
      <TextField
        label="Healthcheck Rating"
        name="Healthcheck Rating"
        value={healthRating}
        onChange={(e) => setHealthRating(e.target.value)}
        fullWidth
        variant="standard"
        margin="normal"
      />
      <TextField
        label={diagCodes ? diagCodes.join(" ") : "Diagnosis codes"}
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
        margin="normal"
        placeholder="Use the Space key for multiple codes"
      />

      {/* Make it togglable */}
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
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
