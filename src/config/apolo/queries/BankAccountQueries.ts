import {gql} from "@apollo/client";
import {BANK_ACCOUNT_FRAGMENT} from "../fragments/BankAccountFragments";

interface BankAccountDetails {
    bankAccountId: number
    title: string
    description: string
    accountType: string
    creationDate: Date
}

export interface BankAccountByIdResp {
    bankAccountById: BankAccountDetails
}

const BANK_ACCOUNT_BY_ID = gql`
    query bankAccountById($id: ID) {
        bankAccountById(id: $id) {
            ...bankAccount
        }
    }
    ${BANK_ACCOUNT_FRAGMENT}
`

export interface AllBankAccountByIdResp {
    allBankAccountsByUserId: BankAccountDetails[]
}

const ALL_BANK_ACCOUNTS_BY_USER_ID = gql`
    query allBankAccountsByUserId($id: ID) {
        allBankAccountsByUserId(id: $id) {
            ...bankAccount
        }
    }
    ${BANK_ACCOUNT_FRAGMENT}
`
export {BANK_ACCOUNT_BY_ID, ALL_BANK_ACCOUNTS_BY_USER_ID}
