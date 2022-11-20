import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";



type EagerPayments = {
  readonly id?: string | null;
  readonly amountPaid?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyPayments = {
  readonly id?: string | null;
  readonly amountPaid?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Payments = LazyLoading extends LazyLoadingDisabled ? EagerPayments : LazyPayments

export declare const Payments: (new (init: ModelInit<Payments>) => Payments)

type EagerDebt = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Debt, 'id'>;
    readOnlyFields: 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly createdAt?: string | null;
  readonly currentAmountOwed?: number | null;
  readonly initialAmountOwed?: number | null;
  readonly isPaidOf?: boolean | null;
  readonly payments?: (Payments | null)[] | null;
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
  readonly initialAmountOwed?: number | null;
  readonly isPaidOf?: boolean | null;
  readonly payments?: (Payments | null)[] | null;
  readonly updatedAt?: string | null;
}

export declare type Debt = LazyLoading extends LazyLoadingDisabled ? EagerDebt : LazyDebt

export declare const Debt: (new (init: ModelInit<Debt>) => Debt) & {
  copyOf(source: Debt, mutator: (draft: MutableModel<Debt>) => MutableModel<Debt> | void): Debt;
}