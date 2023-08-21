import express from 'express';
import { sequelize } from './models/index.js'
import bodyParser from 'body-parser';
import { expressErrorHandler } from './server/expressErrorHandler.js';
import { routes as api } from './api/index.js';

export const app = express();
app.use(bodyParser.json());
app.set('sequelize', sequelize);
app.set('models', sequelize.models);
app.get('/', (_, res) => {
  res.status(200).send('Welcome to DeeL API');
});
app.use('/api/', api);

expressErrorHandler(app);
