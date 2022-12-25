import { API } from "aws-amplify";
import { createDebt, deleteDebt, updateDebt } from "../graphql/mutations";
import { listDebts } from "../graphql/queries";

export const fetchDebt = async () => {
  const apiData = await API.graphql({ query: listDebts });
  return apiData;
};
