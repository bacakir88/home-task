import Sequelize from 'sequelize';
import { sequelizeConfig } from '../config/db.js';

import { setupProfile } from './Profile.js';
import { setupContract } from './Contract.js';
import { setupJob } from'./Job.js';

export const sequelize = new Sequelize(sequelizeConfig);
export const Profile = setupProfile(sequelize);
export const Contract = setupContract(sequelize);
export const Job = setupJob(sequelize);

Profile.hasMany(Contract, { as: 'Contractor', foreignKey: 'ContractorId' });
Contract.belongsTo(Profile, { as: 'Contractor' });
Profile.hasMany(Contract, { as: 'Client', foreignKey: 'ClientId' });
Contract.belongsTo(Profile, { as: 'Client' });
Contract.hasMany(Job);
Job.belongsTo(Contract);
