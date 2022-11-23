/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateDebt = /* GraphQL */ `
  subscription OnCreateDebt($filter: ModelSubscriptionDebtFilterInput) {
    onCreateDebt(filter: $filter) {
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
export const onUpdateDebt = /* GraphQL */ `
  subscription OnUpdateDebt($filter: ModelSubscriptionDebtFilterInput) {
    onUpdateDebt(filter: $filter) {
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
export const onDeleteDebt = /* GraphQL */ `
  subscription OnDeleteDebt($filter: ModelSubscriptionDebtFilterInput) {
    onDeleteDebt(filter: $filter) {
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
