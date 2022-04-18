import { Diagnosis } from '../types';
import diagnoses from '../../data/diagnoses.json';

const getDiagnoses = (): Diagnosis[] => {
  return diagnoses as Diagnosis[];
};

export default {
  getDiagnoses
};
