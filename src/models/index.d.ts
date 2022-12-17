import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection } from "@aws-amplify/datastore";





type EagerRecurring = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Recurring, 'id'>;
  };
  readonly id: string;
  readonly amountPaid?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly debtID: string;
}

type LazyRecurring = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Recurring, 'id'>;
  };
  readonly id: string;
  readonly amountPaid?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly debtID: string;
}

export declare type Recurring = LazyLoading extends LazyLoadingDisabled ? EagerRecurring : LazyRecurring

export declare const Recurring: (new (init: ModelInit<Recurring>) => Recurring) & {
  copyOf(source: Recurring, mutator: (draft: MutableModel<Recurring>) => MutableModel<Recurring> | void): Recurring;
}

type EagerDebt = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Debt, 'id'>;
    readOnlyFields: 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly createdAt?: string | null;
  readonly currentAmountOwed?: number | null;
  readonly isPaidOf?: boolean | null;
  readonly payments?: (Recurring | null)[] | null;
  readonly initialAmountOwed?: number | null;
  readonly updatedAt?: string | null;
}

type LazyDebt = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Debt, 'id'>;
    readOnlyFields: 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly createdAt?: string | null;
  readonly currentAmountOwed?: number | null;
  readonly isPaidOf?: boolean | null;
  readonly payments: AsyncCollection<Recurring>;
  readonly initialAmountOwed?: number | null;
  readonly updatedAt?: string | null;
}

export declare type Debt = LazyLoading extends LazyLoadingDisabled ? EagerDebt : LazyDebt

export declare const Debt: (new (init: ModelInit<Debt>) => Debt) & {
  copyOf(source: Debt, mutator: (draft: MutableModel<Debt>) => MutableModel<Debt> | void): Debt;
}