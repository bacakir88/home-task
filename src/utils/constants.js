export const contractStatus = ['new', 'in_progress', 'terminated'];
export const profileTypes = ['client', 'contractor'];
export const errors = new Map([
    ['ClientNotFound', {
      name: 'ClientNotFound',
      message: 'There are not clients with the provided ID',
      status: 404,
    }],
    ['InvalidDepositAmount', {
      name: 'InvalidDepositAmount',
      message: 'The maximum allowed amount to deposit is:',
      status: 422,
    }],
    ['ContractNotFound', {
      name: 'ContractNotFound',
      message: 'Contract not found',
      status: 404,
    }],
    ['NotContractsFound', {
      name: 'NotContractsFound',
      message: 'The profile does not have active contracts',
      status: 404,
    }],
    ['NotActiveJobsFound', {
      name: 'NotActiveJobsFound',
      message: 'There are not active jobs for this user',
      status: 404,
    }],
    ['JobNotFound', {
      name: 'JobNotFound',
      message: 'The job with provided id does not exist for this user',
      status: 404,
    }],
    ['JobAlreadyPaid', {
      name: 'JobAlreadyPaid',
      message: 'The job with provided id was previously paid',
      status: 422,
    }],
    ['NoSufficientFunds', {
      name: 'NoSufficientFunds',
      message: 'The client balance is insufficient to process the payment',
      status: 422,
    }],
    ['ErrorProcessingTransaction', {
      name: 'ErrorProcessingTransaction',
      message: 'An unexpected error occurred when processing the payment',
      status: 422,
    }],
  ]);
