export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export enum EntryType {
  Hospital = "Hospital",
  HealthCheck = "HealthCheck",
  OccupationalHealthcare = "OccupationalHealthcare",
  None = "None"
}

export interface BaseEntry {
  date: string;
  description: string;
  specialist: string;
  diagnosisCodes?: string[];
  type: EntryType
}

export interface HospitalEntry extends BaseEntry {
  type: EntryType.Hospital,
  discharge: {
    date: string
    criteria: string
  }
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export interface HealthCheckEntry extends BaseEntry {
  type: EntryType.HealthCheck;
  healthCheckRating: HealthCheckRating;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: EntryType.OccupationalHealthcare;
  employerName: string;
  sickLeave?: {
    startDate: string
    endDate: string,
  }
}

export type Entry = | HospitalEntry | HealthCheckEntry | OccupationalHealthcareEntry;
// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// Define Entry without the 'id' property
export type EntryWithoutId = UnionOmit<Entry, 'id'>;


export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[]
}
