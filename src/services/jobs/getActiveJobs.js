import { Op } from 'sequelize';

import { throwCustomError } from '../../utils/errorTools.js';
import {errors} from '../../utils/constants.js';

const NotActiveJobsFoundError = errors.get('NotActiveJobsFound');
const IN_PROGRESS_STATUS = 'in_progress';

const getModels = (req) => req.app.get('models');

const findJobs = ({ profile }, { Job, Contract }) => Job.findAll({
  where: {
    paid: {
      [Op.is]: null,
    },
  },
  include: [{
    model: Contract,
    where: {
      status: IN_PROGRESS_STATUS,
      [Op.or]: [
        { ContractorId: profile.id },
        { ClientId: profile.id },
      ],
    },
  }],
  order: [
    ['ContractId', 'DESC'],
  ],
});

const hasJobs = (result) => result.length > 0;

const checkIfHasActiveJobs = (result) => (
  hasJobs(result) ? result : throwCustomError(NotActiveJobsFoundError)
);

const sendResponse = (res, jobs) => res.status(200).json(jobs);

export const getActiveJobs = async (req, res, next) => {
  try {
    const models = getModels(req);
    const result = await findJobs(req, models);
    const activeJobs = checkIfHasActiveJobs(result);

    sendResponse(res, activeJobs);
  } catch (error) {
    next(error);
  }
};
