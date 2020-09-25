import {gql} from "@apollo/client";

const BANK_ACCOUNT_FRAGMENT=gql`
    fragment bankAccount on BankAccount {
        bankAccountId
        title
        description
        accountType
        creationDate
    }
`
export {BANK_ACCOUNT_FRAGMENT}
