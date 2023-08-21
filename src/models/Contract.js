import Sequelize from 'sequelize';
import { contractStatus } from '../utils/constants.js';

class Contract extends Sequelize.Model {}

export const setupContract = (sequelize) => {
  Contract.init(
    {
      terms: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM(...contractStatus),
      },
    },
    {
      sequelize,
      modelName: 'Contract',
    },
  );

  return Contract;
};
