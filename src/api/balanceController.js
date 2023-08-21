import express from 'express';
import { getProfile } from '../middleware/getProfile.js';
import { depositFunds } from '../services/balances/index.js';

const balances = express.Router();

export default balances
  .post('/balances/deposit/:userId', getProfile, depositFunds);
