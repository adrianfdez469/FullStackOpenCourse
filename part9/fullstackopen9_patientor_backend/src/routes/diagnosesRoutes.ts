import express from 'express';
import diagnosesService from '../services/diagnosesService';

const route = express.Router();

route.get('/', (_req, resp) => {
  resp.status(200).json(diagnosesService.getDiagnoses());
});

export default route;