import { Gender, NewPatientEntry } from '../types';
import {parseDate, parseString} from './utils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (gender: any): gender is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(gender);
};

const parseGender = (gender: unknown): Gender => {
  if(!gender || !isGender(gender)){
    throw new Error("Incorrect or missing gender " + gender);
  }
  return gender;
};

type Fields = {name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown};

const toNewPatient = ({name, dateOfBirth, gender, occupation, ssn}: Fields): NewPatientEntry => {
  const newPatient:NewPatientEntry = {
    name: parseString(name, 'name'),
    dateOfBirth: parseDate(dateOfBirth, 'dateOfBirth'),
    gender: parseGender(gender),
    occupation: parseString(occupation, 'ocupation'),
    ssn: parseString(ssn, 'ssn')
  };

  return newPatient;
};


export default toNewPatient;