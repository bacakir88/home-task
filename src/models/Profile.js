import Sequelize from 'sequelize';
import { profileTypes } from '../utils/constants.js';

class Profile extends Sequelize.Model {}

export const setupProfile = (sequelize) => {
  Profile.init(
    {
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      profession: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      balance: {
        type: Sequelize.DECIMAL(12, 2),
      },
      type: {
        type: Sequelize.ENUM(...profileTypes),
      },
    },
    {
      sequelize,
      modelName: 'Profile',
    },
  );

  return Profile;
};
