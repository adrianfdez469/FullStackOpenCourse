import { EntryWithoutId, Entry, BaseEntry, HealthCheckRating } from '../types';
import { isString, parseDate, parseStrignArrayOrUndef, parseString } from './utils';

type Fields = {
  id: unknown
  description: unknown
  date: unknown
  specialist: unknown
  diagnosisCodes: unknown

  healthCheckRating: unknown
  
  discharge: unknown
  employerName: unknown
  sickLeave: unknown
};

const asserNever = (value: never): never => {
  throw new Error(`Unhandled type: ${value}`);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHelthCheckRating = (data: any): data is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(data);
};

const parseHelthCheckRating = (data: unknown):HealthCheckRating => {
  if(!isHelthCheckRating(data)){
    throw new Error(`Incorrect or missing rating`);
  }
  return data;
};

const isSickLieave = (data: unknown): data is {startDate: string, endDate: string} | undefined => {
  if(!data) return true;
  else if(
    !(data instanceof Object)
    || !Object.keys(data).includes('startDate')
    || !Object.keys(data).includes('endDate')
    || !Object.values(data).every(v => isString(v))
  ){
    return false;
  }
  return true;
};

const parseSickLeave = (data: unknown): {startDate: string, endDate: string}|undefined => {
  if(!isSickLieave(data)){
    throw new Error(`Incorrect or missing sick leaving period`);
  }
  return data;
};

const isDischarge = (data: unknown): data is {date: string, criteria: string} => {
  if(
     !(data instanceof Object)
    || data === undefined 
    || !Object.keys(data).includes('date')
    || !Object.keys(data).includes('criteria')
    || !Object.values(data).every(v => isString(v))
  ){
    return false;
  }
  return true;
};

const parseDischarge = (data: unknown): {date: string, criteria: string} => {
  if(!isDischarge(data)){
    throw new Error('Incorrect or missing discharge');
  }
  return data;
};

const toBaseEntry = (data: Fields):Omit<BaseEntry, "id"> => {
  return {
    date: parseDate(data.date, 'date'),
    description: parseString(data.description, "description"),
    specialist: parseString(data.specialist, "specialist"),
    diagnosisCodes: parseStrignArrayOrUndef(data.diagnosisCodes, 'diagnosisCodes')
  };
};

const toHelthCheckEntry = (data: Fields): EntryWithoutId => {
  const baseDataEntry =  toBaseEntry(data);
  return {
    type: 'HealthCheck',
    ...baseDataEntry,
    healthCheckRating: parseHelthCheckRating(data.healthCheckRating)
  };
  
};
const toHospitalEntry = (data: Fields):EntryWithoutId => {
  const baseDataEntry =  toBaseEntry(data);
  return {
    type: 'Hospital',
    ...baseDataEntry,
    specialist: parseString(data.specialist, "specialist"),
    discharge: parseDischarge(data.discharge)
  };
};
const toOccupationalHealthcareEntry = (data: Fields):EntryWithoutId => {
  const baseDataEntry =  toBaseEntry(data);
  return {
    type: 'OccupationalHealthcare',
    ...baseDataEntry,
    employerName: parseString(data.employerName, "emplpoyer name"),
    sickLeave: parseSickLeave(data.sickLeave)
  };
};

const toNewPatienEntry = (type: Entry["type"], data: Fields): EntryWithoutId => {

  switch (type) {
    case "HealthCheck":
      return toHelthCheckEntry(data);
    case "Hospital":
      return toHospitalEntry(data);
    case "OccupationalHealthcare":
      return toOccupationalHealthcareEntry(data);
    default: 
      return asserNever(type);
  }
};


export default toNewPatienEntry;