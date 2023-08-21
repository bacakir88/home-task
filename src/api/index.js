import express from 'express';

import adminController from './adminController.js'
import balanceController from'./balanceController.js'
import contractController from'./contractController.js'
import jobController from'./jobController.js'

export const routes = express.Router();

routes.use(adminController);
routes.use(balanceController);
routes.use(contractController);
routes.use(jobController);