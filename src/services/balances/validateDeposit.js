import { throwCustomError } from '../../utils/errorTools.js';
import { errors } from '../../utils/constants.js';

const InvalidDepositAmountError = errors.get('InvalidDepositAmount');
const maximumDepositPercentage = 0.25;

const getMaximumAllowedAmount = (totalJobsSum) => totalJobsSum * maximumDepositPercentage;

const exceedsAllowedAmount = (depositAmount, maximumAllowedAmount) => (
  depositAmount > maximumAllowedAmount
);

const geErrorMessage = ({ message }, maximumAllowedAmount) => `${message} $${maximumAllowedAmount}`;

/**
 * Checks if the Client is able to receive the funds to deposit
  * @param {object} dataValues
  * @param {number} dataValues.totalJobsSum
  * @param {number} depositAmount
  */
export const validateDeposit = ({ totalJobsSum }, depositAmount) => {
  const maximumAllowedAmount = getMaximumAllowedAmount(totalJobsSum);

  if (exceedsAllowedAmount(depositAmount, maximumAllowedAmount)) {
    throwCustomError({
      ...InvalidDepositAmountError,
      message: geErrorMessage(InvalidDepositAmountError, maximumAllowedAmount),
    });
  }
};
