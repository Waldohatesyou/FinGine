import { Result } from "@badrap/result";

import { ensure } from './util'
import {Account} from './account'
import {FinancialState} from './financialState'

interface Event {
    state: FinancialState;
    alterState(accountName: String): Result<number, Error> ;
}

export class taxEvent implements Event {
    state: FinancialState;
    taxRate: number;
    
    constructor(givenState: FinancialState, givenFlatTaxRate: number) {
        this.state = givenState;
        this.taxRate = givenFlatTaxRate;
    }

    alterState(accountName: String): Result<number, Error> {
        const account = ensure(this.state.accounts.find(account => account.name === accountName))
        if (account) {
            const tax = account.balance * this.taxRate;
            return account.withdrawFromBalance(tax); 
        } else {
            return Result.err(new Error("account does not exist"));
        }
    }

}

export class expenseEvent implements Event {
    state: FinancialState;
    expense: number;

    constructor(givenState: FinancialState, givenExpense: number) {
        this.state = givenState;
        this.expense = givenExpense;
    }

    alterState(accountName: String): Result<number, Error> {
        const account = ensure(this.state.accounts.find(account => account.name === accountName))
        if (account) {
            return account.withdrawFromBalance(this.expense); 
        } else {
            return Result.err(new Error("account does not exist"));
        }
    }
}

export class incomeEvent implements Event {
    state: FinancialState;
    income: number;

    constructor(givenState: FinancialState, givenIncome: number) {
        this.state = givenState;
        this.income = givenIncome;
    }

    alterState(accountName: String): Result<number, Error> {
        const account = ensure(this.state.accounts.find(account => account.name === accountName))
        if (account) {
            return account.addToBalance(this.income); 
        } else {
            return Result.err(new Error("account does not exist"));
        }
    }
}

