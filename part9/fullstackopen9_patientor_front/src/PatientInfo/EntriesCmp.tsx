import { Card, CardContent, CardHeader, Typography } from "@material-ui/core";
import React from "react";
import { HealthCheckRating, Entry, HospitalEntry, OccupationalHealthcareEntry, HealthCheckEntry, EntryType } from '../types';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import HealingIcon from '@material-ui/icons/Healing';
import LocalPharmacyIcon from '@material-ui/icons/LocalPharmacy';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

type PropsType = {
  entry: Entry,
  diagnosis? : string
};

const EntryDetails: React.FC<PropsType> = (props) => {
  switch (props.entry.type) {
    case EntryType.HealthCheck:
      return <EntryHelthCheckItem entry={props.entry}>{props.children}</EntryHelthCheckItem>;
    case EntryType.Hospital:
      return <EntryHospitalItem entry={props.entry}>{props.children}</EntryHospitalItem>;
    case EntryType.OccupationalHealthcare:
      return <OcupationalEntryItem entry={props.entry}>{props.children}</OcupationalEntryItem>;
    default:
      assertNever(props.entry);
      return null;
  }
};

const EntryHelthCheckItem: React.FC<{entry: HealthCheckEntry}> = (props) => (
  <Card>
    <CardHeader 
      avatar={<HealingIcon />}
      title={props.entry.description}
      subheader={`${props.entry.date} ${HealthCheckRating[props.entry.healthCheckRating]}` }
      />
    <CardContent>
      {props.children}
    </CardContent>
  </Card>
);

const EntryHospitalItem: React.FC<{entry: HospitalEntry}> = (props) => (
  <Card>
    <CardHeader 
      avatar={<LocalHospitalIcon />} 
      title={props.entry.description}
      subheader={props.entry.date}
    />
    <CardContent>
      <Typography variant="body1">{props.entry.discharge.criteria}</Typography>
      <Typography variant="body2">{props.entry.discharge.date}</Typography>
      {props.children}
    </CardContent>
  </Card>
);

const OcupationalEntryItem:React.FC<{entry: OccupationalHealthcareEntry}> = (props) =>  (
  <Card>
    <CardHeader 
      avatar={<LocalPharmacyIcon color="primary"/>} 
      title={props.entry.description}
      subheader={props.entry.date}
    />
    <CardContent>
      <Typography>{`Employer: ${props.entry.employerName}`}</Typography>
      <Typography>{`Sick period: ${props.entry.sickLeave ? props.entry.sickLeave.startDate + ' - ' + props.entry.sickLeave.endDate : '-'}`}</Typography>
      {props.children}
      <Typography variant="subtitle1">{`diagnose by ${props.entry.specialist}`}</Typography>
    </CardContent>
  </Card>);



const EntriesItem:React.FC<PropsType> = (props) => <EntryDetails {...props} />;

export default EntriesItem;