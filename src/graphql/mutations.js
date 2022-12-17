/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createRecurring = /* GraphQL */ `
  mutation CreateRecurring(
    $input: CreateRecurringInput!
    $condition: ModelRecurringConditionInput
  ) {
    createRecurring(input: $input, condition: $condition) {
      id
      amountPaid
      createdAt
      updatedAt
      debtID
    }
  }
`;
export const updateRecurring = /* GraphQL */ `
  mutation UpdateRecurring(
    $input: UpdateRecurringInput!
    $condition: ModelRecurringConditionInput
  ) {
    updateRecurring(input: $input, condition: $condition) {
      id
      amountPaid
      createdAt
      updatedAt
      debtID
    }
  }
`;
export const deleteRecurring = /* GraphQL */ `
  mutation DeleteRecurring(
    $input: DeleteRecurringInput!
    $condition: ModelRecurringConditionInput
  ) {
    deleteRecurring(input: $input, condition: $condition) {
      id
      amountPaid
      createdAt
      updatedAt
      debtID
    }
  }
`;
export const createDebt = /* GraphQL */ `
  mutation CreateDebt(
    $input: CreateDebtInput!
    $condition: ModelDebtConditionInput
  ) {
    createDebt(input: $input, condition: $condition) {
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
export const updateDebt = /* GraphQL */ `
  mutation UpdateDebt(
    $input: UpdateDebtInput!
    $condition: ModelDebtConditionInput
  ) {
    updateDebt(input: $input, condition: $condition) {
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
export const deleteDebt = /* GraphQL */ `
  mutation DeleteDebt(
    $input: DeleteDebtInput!
    $condition: ModelDebtConditionInput
  ) {
    deleteDebt(input: $input, condition: $condition) {
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
