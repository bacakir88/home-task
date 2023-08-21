import express from 'express';

import { getProfile } from '../middleware/getProfile.js';
import { getActiveJobs, payJob } from '../services/jobs/index.js'

const jobs = express.Router();

export default jobs
  .get('/jobs/unpaid', getProfile, getActiveJobs)
  .post('/jobs/:job_id/pay', getProfile, payJob);
