/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getDebt = /* GraphQL */ `
  query GetDebt($id: ID!) {
    getDebt(id: $id) {
      id
      name
      createdAt
      currentAmountOwed
      initialAmountOwed
      isPaidOf
      payments {
        id
        amountPaid
        createdAt
        updatedAt
      }
      updatedAt
    }
  }
`;
export const listDebts = /* GraphQL */ `
  query ListDebts(
    $filter: ModelDebtFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDebts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        createdAt
        currentAmountOwed
        initialAmountOwed
        isPaidOf
        payments {
          id
          amountPaid
          createdAt
          updatedAt
        }
        updatedAt
      }
      nextToken
    }
  }
`;
