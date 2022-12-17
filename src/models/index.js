// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Recurring, Debt } = initSchema(schema);

export {
  Recurring,
  Debt
};