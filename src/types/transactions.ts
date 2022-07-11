export type TTransaction = {
    __typename: string,
    status: string,
    title: string,
    description: string,
    type: string,
    date: string
}

export type TSortedTransaction = {
  date: string,
  data: TTransaction
}