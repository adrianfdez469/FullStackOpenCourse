import express from 'express';
import cors from 'cors';

import diagnosesRoutes from './routes/diagnosesRoutes';
import patientsRoutes from './routes/patientsRoutes';

const app = express();
app.use(cors());
app.use(express.json());


app.get('/api/ping', (_req, resp) => {
  resp.status(200).send("Hello World!");
});

app.use('/api/diagnoses', diagnosesRoutes);
app.use('/api/patients', patientsRoutes);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});