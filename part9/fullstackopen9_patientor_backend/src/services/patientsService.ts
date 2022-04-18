import { Patient, NewPatientEntry, EntryWithoutId, /*Gender, /*Entry*/ } from '../types';
import data from '../../data/patients';
import { v1 as uuid } from 'uuid';

const patients: Patient[] = data.map(({id, name, dateOfBirth, gender, occupation, ssn, entries}) => {
  return {
    id, 
    name, 
    dateOfBirth, 
    gender: gender, //=== Gender.Female ? Gender.Female: Gender.Male, 
    occupation,
    ssn: ssn,
    entries: entries
  };
});

const getPatients = (): Omit<Patient, "ssn">[] => {
  return patients.map(({id, name, dateOfBirth, gender, occupation, entries}) => {
    return {
      id, name, dateOfBirth, gender, occupation, entries
    };
  });
};

const findPatient = (id: string): Patient | undefined => {
  return patients.find(p => p.id === id);
};

const addPatient = (entry: NewPatientEntry) : Patient => {
  const newPatient: Patient = {
    id: uuid(),
    ...entry,
    entries: []
  };
  patients.push(newPatient);

  return newPatient;
};

const addEntryToPatient = (id: string, entry: EntryWithoutId): Patient | undefined => {
    const patient = patients.find(p => p.id === id);
    if(patient){
      const newEntry = {
        id: uuid(),
        ...entry
      };
      patient.entries.push(newEntry);
      return patient;
    }else{
      throw new Error('Patient not found!');
    }
};

export default {
  getPatients,
  findPatient,
  addPatient,
  addEntryToPatient
};