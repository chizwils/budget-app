/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getRecurring = /* GraphQL */ `
  query GetRecurring($id: ID!) {
    getRecurring(id: $id) {
      id
      amountPaid
      createdAt
      updatedAt
      debtID
    }
  }
`;
export const listRecurrings = /* GraphQL */ `
  query ListRecurrings(
    $filter: ModelRecurringFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRecurrings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        amountPaid
        createdAt
        updatedAt
        debtID
      }
      nextToken
    }
  }
`;
export const recurringsByDebtID = /* GraphQL */ `
  query RecurringsByDebtID(
    $debtID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelRecurringFilterInput
    $limit: Int
    $nextToken: String
  ) {
    recurringsByDebtID(
      debtID: $debtID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        amountPaid
        createdAt
        updatedAt
        debtID
      }
      nextToken
    }
  }
`;
export const getDebt = /* GraphQL */ `
  query GetDebt($id: ID!) {
    getDebt(id: $id) {
      id
      name
      createdAt
      currentAmountOwed
      isPaidOf
      payments {
        items {
          id
          amountPaid
          createdAt
          updatedAt
          debtID
        }
        nextToken
      }
      initialAmountOwed
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
        isPaidOf
        payments {
          items {
            id
            amountPaid
            createdAt
            updatedAt
            debtID
          }
          nextToken
        }
        initialAmountOwed
        updatedAt
      }
      nextToken
    }
  }
`;
