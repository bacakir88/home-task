import express from 'express';
import { getProfile } from '../middleware/getProfile.js';
import { getContractsByProfile, getContractById } from '../services/contracts/index.js'

const contracts = express.Router();

export default contracts
  .get('/contracts', getProfile, getContractsByProfile)
  .get('/contracts/:id', getProfile, getContractById);