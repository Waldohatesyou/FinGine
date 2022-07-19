import { Account } from "./account"

export class FinancialState {
    accounts: Account[];
    
    constructor(givenAccounts: Account[]) {
        this.accounts = givenAccounts;
    }
}