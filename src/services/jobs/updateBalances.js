import { sequelize } from '../../models/index.js';
import { throwCustomError } from '../../utils/errorTools.js';
import { errors } from '../../utils/constants.js';

const ErrorProcessingTransaction = errors.get('ErrorProcessingTransaction');

const updateProfileBalance = ({
  id, balance, models, transaction,
}) => models.Profile.update(
  { balance },
  {
    where: { id },
    transaction,
  },
);

const updateJobStatus = ({ job, models, transaction }) => models.Job.update(
  {
    paid: 1,
    paymentDate: new Date(),
  },
  {
    where: { id: job.id },
    transaction,
  },
);

const getNewClientBalance = (client, job) => client.balance - job.price;

const getNewContractorBalance = (contractor, job) => contractor.balance + job.price;

/**
  * @param {object} options
  * @param {object} options.client
  * @param {object} options.contractor
  * @param {object} options.job
  * @param {object} options.models
  */
export const updateBalances = async ({
  client, contractor, job, models,
}) => {
  try {
    const newClientBalance = getNewClientBalance(client, job);
    const newContractorBalance = getNewContractorBalance(contractor, job);

    await sequelize.transaction(async (transaction) => {
      await updateProfileBalance({
        id: client.id,
        balance: newClientBalance,
        models,
        transaction,
      });
      await updateProfileBalance({
        id: contractor.id,
        balance: newContractorBalance,
        models,
        transaction,
      });
      await updateJobStatus({ job, models, transaction });
    });

    return {};
  } catch (error) {
    throwCustomError(ErrorProcessingTransaction);
  }
};
