import { useState, useEffect } from "react";
import axios from "axios";
import { Route, Link, Routes, useMatch } from "react-router-dom";
import { Button, Divider, Container, Typography } from "@mui/material";

import { apiBaseUrl } from "./constants";
import { Gender, Patient, Individual, Diagnosis, Entry } from "./types";

import patientService from "./services/patients";
import diagService from "./services/diagnoses";
import PatientListPage from "./components/PatientListPage";
import PatientDetails from "./components/PatientDetails";
import Notification from "./components/Notification";

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [notification, setNotification] = useState({
    type: "",
    message: "",
  });

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };
    const fetchDiagnoses = async () => {
      const allDiag = await diagService.getAll();
      setDiagnoses(allDiag);
    };

    void fetchPatientList();
    void fetchDiagnoses();
  }, []);

  const patientMatch = useMatch("/patient/:id");
  const patientFound = patientMatch
    ? patients.find((patient) => patient.id === patientMatch.params.id)
    : null;
  const patientToShow: Individual = {
    // should i declare it as a state? ...
    id: "",
    name: "",
    ssn: "",
    occupation: "",
    gender: Gender.Other,
    entries: [],
    diags: [],
  };

  if (patientFound) {
    patientToShow.id = patientFound.id;
    patientToShow.name = patientFound.name;
    patientToShow.ssn = patientFound.ssn;
    patientToShow.occupation = patientFound.occupation;
    patientToShow.gender = patientFound.gender;
    patientToShow.entries = patientFound.entries; // If the diags attrib pans out, this will become redundant
    // different entries can have duplicate diagnosis? I'm assuming
    // Getting it from the patients api would be simpler but this is the instruction 🤔
  }

  const onAddEntry = (id: string, newEntry: Entry) => {
    const newPatients = patients.map((patient) => {
      if (patient.id === id) {
        return {
          ...patient,
          entries: [...(patient.entries || []), newEntry],
        };
      }
      return patient;
    });
    setPatients(newPatients);
  };

  return (
    <div className="App">
      <Container>
        <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
          Patientor
        </Typography>
        <Button component={Link} to="/" variant="contained" color="primary">
          Home
        </Button>
        <Notification message={notification} />
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
            element={
              <PatientDetails
                patientToShow={patientToShow}
                onAddEntry={onAddEntry}
                notify={setNotification}
                diags={diagnoses}
              />
            }
          />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
