import express from 'express';
import { getBestProfession, getBestClients } from '../services/admin/index.js';

const admin = express.Router();

export default admin
  .get('/admin/best-profession', getBestProfession)
  .get('/admin/best-clients', getBestClients);

