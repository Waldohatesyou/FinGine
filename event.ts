import { Result } from "@badrap/result";

class Event {

}

class FinancialState {
    accounts: Account[];
    
    constructor(givenAccounts: Account[]) {
        this.accounts = givenAccounts;
    }
}

class Account {
    name: string;
    balance: number;
    maxBalance: number;
    interestRate: number;


    constructor(givenName: string, givenBalance: number, givenMaxBalance: number, givenInterestRate: number) {
        this.name = givenName;
        this.balance = givenBalance;
        this.maxBalance = givenMaxBalance;
        this.interestRate = givenInterestRate;
    }
    addToBalance(amount: number): Result<number, Error> {
        if ((this.balance + amount) <= this.maxBalance) {
            this.balance += amount;
            return Result.ok(this.balance);
        }
        return Result.err(new Error("Would exceed max balance"));
    }

    withdrawFromBalance(amount: number): Result<number, Error> {     
        if (this.balance >= amount) {
            this.balance -= amount;
            return Result.ok(this.balance);
        }
        return Result.err(new Error("Insufficient funds"));
    }
    addInterest() {
        this.balance += this.balance * this.interestRate;
    }

}