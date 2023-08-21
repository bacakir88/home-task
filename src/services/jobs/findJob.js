import { throwCustomError } from '../../utils/errorTools.js';
import {errors} from '../../utils/constants.js';

const JobNotFoundError = errors.get('JobNotFound');
const JobAlreadyPaidError = errors.get('JobAlreadyPaid');
const IN_PROGRESS_STATUS = 'in_progress';

const checkIfJobExists = (result) => (
  !result ? throwCustomError(JobNotFoundError) : result
);

const checkIfJobWasPaid = (job) => (
  job.paid ? throwCustomError(JobAlreadyPaidError) : job
);

const getJob = ({ profile, params }, { Job, Contract }) => Job.findOne({
  where: {
    id: params.job_id,
  },
  include: [{
    model: Contract,
    where: {
      status: IN_PROGRESS_STATUS,
      ClientId: profile.id,
    },
  }],
});

export const findJob = async (req, models) => {
  const result = await getJob(req, models);
  const job = checkIfJobExists(result);
  checkIfJobWasPaid(job);

  return job;
};
