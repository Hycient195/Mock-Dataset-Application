import { gql } from '@apollo/client';

export const Transactions_Query = gql`
  {
    allTransactions {
      status
      title
      description
      type
      date
    }
  }
`