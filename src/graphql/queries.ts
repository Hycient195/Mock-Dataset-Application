import { gql } from '@apollo/client';

export const Transactions_Query = gql`
  {
    allTransactions {
      status
      title
      description
      type
      amount
      currency
      date
    }
  }
`

export const Filter_Query = (criteria: string, value: string) => gql`
  {
    query {
      allTransactions(filter: {
          ${criteria}: "${value}"
      }) {
        status
        title
        description
        type
        amount
        currency
        date
      }
    }
  }
`