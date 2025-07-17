import { useState, useEffect } from "react";
import axios from "axios";
import { Route, Link, Routes, useMatch } from "react-router-dom";
import { Button, Divider, Container, Typography } from "@mui/material";

import { apiBaseUrl } from "./constants";
import { Gender, Patient } from "./types";

import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";
import PatientDetails from "./components/PatientListPage/PatientDetails";

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };
    void fetchPatientList();
  }, []);

  const patientMatch = useMatch("/patient/:id");
  const patientFound = patientMatch
    ? patients.find((patient) => patient.id === patientMatch.params.id)
    : null;
  const patientToShow = {
    name: "",
    ssn: "",
    occupation: "",
    gender: Gender.Other,
  };
  if (patientFound) {
    patientToShow.name = patientFound.name;
    patientToShow.ssn = patientFound.ssn;
    patientToShow.occupation = patientFound.occupation;
    patientToShow.gender = patientFound.gender;
  }

  return (
    <div className="App">
      <Container>
        <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
          Patientor
        </Typography>
        <Button component={Link} to="/" variant="contained" color="primary">
          Home
        </Button>
        <Divider hidden />
        <Routes>
          <Route
            path="/"
            element={
              <PatientListPage patients={patients} setPatients={setPatients} />
            }
          />
          <Route
            path="/patient/:id"
            element={<PatientDetails {...patientToShow} />}
          />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
