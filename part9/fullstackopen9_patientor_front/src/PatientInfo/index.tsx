import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { updatePatient, useStateValue } from '../state';
import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { Typography, Divider, Chip, Button } from '@material-ui/core';
// Material-ui v4 doesnt have the Male/Female icons
// To not unistall material-ui v4 and install v5 I use the following icons icons instead
import MaleIcon from '@material-ui/icons/AccessibleForwardOutlined';
import FemaleIcon from '@material-ui/icons/AccessibilityNewOutlined';
import EntriesItem from './EntriesCmp';
import AddEntryModal from './AddEntry';
import { EntryWithoutId, Patient } from '../types';


const PatientInfo = () => {

  const { id } = useParams<{id: string}>();
  const [state, dispath] = useStateValue();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryWithoutId) => {
    try {
      if(id){
        const { data: updatedPatient } = await axios.post<Patient>(
          `${apiBaseUrl}/patients/${id}/entries`,
          values
        );
        dispath(updatePatient({id, patient: updatedPatient}));
        closeModal();
      }
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        setError(String(e?.response?.data?.error) || "Unrecognized axios error");
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  useEffect(() => {
    
    if(id && state.patients[id] && !state.patients[id].ssn){
      const fetchPatientData = async () => {
        try{
          const data = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
          if (data && data.status === 200) {
            dispath(updatePatient({id, patient:data.data}));
          }else{
            throw new Error("No data fetched");
          }
        } catch (e) {
          console.error(e);
        }
      };
      void fetchPatientData();
    }
  }, []);

  if(!id || !state.patients[id]){
    return null;
  }

  const chipStyle = {
    margin: '2px'
  };
  const verticalMargin = {
    margin: '5px 0'
  };

  return (
    <>
      <Divider />
      <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
        {state.patients[id].name} 
        {state.patients[id].gender === "male" ? <MaleIcon /> : <FemaleIcon />}
      </Typography>
      <br />
      <Typography variant='body1'>ssn: {state.patients[id].ssn}</Typography>
      <Typography variant='body2'>ocupation: {state.patients[id].occupation}</Typography>
      <br />
      <Typography variant='h6'>Entries</Typography>
      {state.patients[id].entries.map((e, idx) => {
        return (
          <div key={idx} style={verticalMargin}>
              <EntriesItem entry={e} >
                {e.diagnosisCodes && e.diagnosisCodes.map(dc => <Chip color='secondary' style={chipStyle} key={dc} label={state.diagnosis.find(d => d.code === dc)?.name} />)}
              </EntriesItem>
          </div>

        );
      })}
      <AddEntryModal 
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        onClose={closeModal}
        error={error}
      />
      <Button variant="contained" color="primary" style={verticalMargin} onClick={() => openModal()}>
        Add new entry
      </Button>
      
    </>
  );

};
export default PatientInfo;