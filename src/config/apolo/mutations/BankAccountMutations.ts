import {gql} from "@apollo/client";
import {BANK_ACCOUNT_FRAGMENT} from "../fragments/BankAccountFragments";

const BANK_ACCOUNT_TYPE = gql`
    enum AccountType {
        CHECKING
        SAVINGS
        CASH
        CREDIT_CARD
    }
`
const CREATE_BANK_ACCOUNT = gql`
    mutation createBankAccount(
        $userId: ID
        $title: String
        $description: String
        $accountType: AccountType
        $initialBalance: Float
    ) {
        createBankAccount(
            form: {
                userId: $userId
                title: $title
                description: $description
                accountType: $accountType
                initialBalance: $initialBalance
            }
        ) {
            ...bankAccount
        }
    }
    ${BANK_ACCOUNT_FRAGMENT}
`
export {CREATE_BANK_ACCOUNT}
