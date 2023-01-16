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
  const apiData = await API.graphql({
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
  return apiData;
};
export const delDebt = async (id) => {
  console.log(id, "op");
  const delItem = await API.graphql({
    query: deleteDebt,
    variables: { input: { id: id } },
  });
  console.log(delItem, "del");
  return delItem;
};
