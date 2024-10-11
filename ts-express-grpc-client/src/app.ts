import express from 'express';
import { insertData } from './routes/insertData';
import { selectData } from './routes/selectData';

const app = express();
app.use(express.json());

app.get('/select-data/:id', selectData);
app.post('/insert-data', insertData);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Express server running on port ${PORT}`);
});
