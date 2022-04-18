import express from 'express';
import patientsService from '../services/patientsService';
import toNewPatient from '../utils/toNewPatient';
import toNewPatienEntry from '../utils/toNewEntry';

const router = express.Router();

router.get('/', (_req, resp) => {
  resp.status(200).json(patientsService.getPatients());
});

router.get('/:id', (req, resp) => {
  try {
    const { id } = req.params;
    const patient = patientsService.findPatient(id);
    resp.status(200).json(patient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong!";
    if (error instanceof Error){
      errorMessage += "Error: " + error.message;
    }
    resp.status(400).send(errorMessage);
  }
});

router.post('/', (req, resp) => {
  try{
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatientEntry = toNewPatient(req.body);
    const patientEntry = patientsService.addPatient(newPatientEntry);
    resp.status(201).json(patientEntry);
  } catch (error: unknown){
    let errorMessage = "Something went wrong!";
    if (error instanceof Error){
      errorMessage += "Error: " + error.message;
    }
    resp.status(400).send(errorMessage);
  }
});

router.post('/:id/entries', (req, resp) => {
  try {
    
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const entryData = toNewPatienEntry(req.body.type, req.body);
    const {id} = req.params;
    const updatedPatient = patientsService.addEntryToPatient(id, entryData);
    resp.status(201).json(updatedPatient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong!";
    if (error instanceof Error){
      errorMessage += "Error: " + error.message;
    }
    resp.status(400).send(errorMessage);
    
  }  
});

export default router;