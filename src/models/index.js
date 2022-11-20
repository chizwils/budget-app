// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Debt, Payments } = initSchema(schema);

export {
  Debt,
  Payments
};