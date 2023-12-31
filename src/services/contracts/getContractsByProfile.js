import { Op }from 'sequelize';

import { throwCustomError } from '../../utils/errorTools.js';
import { errors } from '../../utils/constants.js';

const NotContractsFoundError = errors.get('NotContractsFound');
const IN_PROGRESS_STATUS = 'in_progress';

const getContractModel = (req) => req.app.get('models').Contract;

const findContracts = ({ profile }, Contract) => Contract.findAll({
  where: {
    status: IN_PROGRESS_STATUS,
    [Op.or]: [
      { ContractorId: profile.id },
      { ClientId: profile.id },
    ],
  },
});

const hasContracts = (result) => result.length > 0;

const checkIfHasContracts = (result) => (
  hasContracts(result) ? result : throwCustomError(NotContractsFoundError)
);

const sendResponse = (res, contract) => res.status(200).json(contract);

export const getContractsByProfile = async (req, res, next) => {
  try {
    const Contract = getContractModel(req);
    const result = await findContracts(req, Contract);
    const contracts = checkIfHasContracts(result);

    sendResponse(res, contracts);
  } catch (error) {
    next(error);
  }
};
