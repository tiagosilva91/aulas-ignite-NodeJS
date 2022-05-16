import express from 'express';
import { createCouser } from './routes';

const app = express();


app.get('/', createCouser)
app.listen(3333)