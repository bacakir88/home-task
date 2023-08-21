import { Op }from 'sequelize';

import { throwCustomError } from '../../utils/errorTools.js';
import { errors } from '../../utils/constants.js';

const contractNotFoundError = errors.get('ContractNotFound');

export const getContractModel = (req) => req.app.get('models').Contract;

export const findContract = ({ params, profile }, Contract) => Contract.findOne({
  where: {
    id: params.id,
    [Op.or]: [
      { ContractorId: profile.id },
      { ClientId: profile.id },
    ],
  },
});

export const checkIfContractExists = (result) => (
  !result ? throwCustomError(contractNotFoundError) : result
);

export const sendResponse = (res, contract) => res.status(200).json(contract);

export const getContractById = async (req, res, next) => {
  try {
    const Contract = getContractModel(req);
    const result = await findContract(req, Contract);
    const contract = checkIfContractExists(result);

    sendResponse(res, contract);
  } catch (error) {
    next(error);
  }
};

