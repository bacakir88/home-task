import { handleExpressError } from '../utils/logger.js';

/**
 * setup Express error handler
 * @param {Object} app Express application Object
 */
export const expressErrorHandler = (app) => {
  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {

    const error = handleExpressError(err);
    const status = error.status || 500;

    res.status(status).send(error);
  });
};
