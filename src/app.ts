import cors from 'cors';
import express, { Application, Request, Response } from 'express';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

console.log('  my name is samiul');
const a=10;

app.get('/', (req,res) => {
  res.send('Hello World!');
});

export default app;
