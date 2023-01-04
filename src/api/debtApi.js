import { API } from "aws-amplify";
import { createDebt, deleteDebt, updateDebt } from "../graphql/mutations";
import { listDebts } from "../graphql/queries";

const dateFormatter = (curr) => {
  const date = new Date(curr);
  return date.toString();
};
export const fetchDebt = async () => {
  const apiData = await API.graphql({ query: listDebts });
  return apiData;
};

export const addDebt = async (bill) => {
  await API.graphql({
    query: createDebt,
    variables: {
      input: {
        name: bill.name,
        createdAt: dateFormatter(Date.now()),
        currentAmountOwed: bill.initialAmountOwed,
        initialAmountOwed: bill.initialAmountOwed,
        isPaidOf: false,
      },
    },
  });
};
