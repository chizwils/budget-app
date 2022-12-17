/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateRecurring = /* GraphQL */ `
  subscription OnCreateRecurring(
    $filter: ModelSubscriptionRecurringFilterInput
  ) {
    onCreateRecurring(filter: $filter) {
      id
      amountPaid
      createdAt
      updatedAt
      debtID
    }
  }
`;
export const onUpdateRecurring = /* GraphQL */ `
  subscription OnUpdateRecurring(
    $filter: ModelSubscriptionRecurringFilterInput
  ) {
    onUpdateRecurring(filter: $filter) {
      id
      amountPaid
      createdAt
      updatedAt
      debtID
    }
  }
`;
export const onDeleteRecurring = /* GraphQL */ `
  subscription OnDeleteRecurring(
    $filter: ModelSubscriptionRecurringFilterInput
  ) {
    onDeleteRecurring(filter: $filter) {
      id
      amountPaid
      createdAt
      updatedAt
      debtID
    }
  }
`;
export const onCreateDebt = /* GraphQL */ `
  subscription OnCreateDebt($filter: ModelSubscriptionDebtFilterInput) {
    onCreateDebt(filter: $filter) {
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
export const onUpdateDebt = /* GraphQL */ `
  subscription OnUpdateDebt($filter: ModelSubscriptionDebtFilterInput) {
    onUpdateDebt(filter: $filter) {
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
export const onDeleteDebt = /* GraphQL */ `
  subscription OnDeleteDebt($filter: ModelSubscriptionDebtFilterInput) {
    onDeleteDebt(filter: $filter) {
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
